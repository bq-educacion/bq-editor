// src/examples/EditorAppLike.stories.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProsemirrorNode } from "remirror";
import Editor, { editorNodeToHtml, IEditorProps } from "../Editor";

/* helpers (debounce + mock upload) */
function useDebounced<T extends (...args: any[]) => void>(fn: T, wait = 200) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fnRef.current(...args), wait);
    },
    [wait]
  );
}
type IResourceUpload = { url: string };
const uploadResource = async (file?: File): Promise<IResourceUpload> => {
  await new Promise((r) => setTimeout(r, 150));
  return { url: file ? URL.createObjectURL(file) : "" };
};
const resourcesConfig = {
  image: {
    formats: [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"],
    maxSize: 8_000_000,
  },
};

/* utils */
const toHtml = (val: string | ProsemirrorNode | undefined) =>
  typeof val === "string" ? val : val ? editorNodeToHtml(val) : "";

/* sección */
type SectionEditorProps = Omit<
  IEditorProps,
  | "initialContent"
  | "extensions"
  | "onChange"
  | "onUploadImage"
  | "imageFormats"
  | "imageMaxSize"
  | "stringHandler"
> & {
  label: string;
  value?: string;
  onValue?: (v: string) => void;
  dupFullscreen?: boolean;
};

const SectionEditor: React.FC<SectionEditorProps> = ({
  label,
  value = "",
  onValue,
  dupFullscreen,
  ...props
}) => {
  const [full, setFull] = useState(false);
  const onUploadImage = useCallback(async (file?: File) => {
    const resource = file && (await uploadResource(file));
    return resource || { url: "" };
  }, []);

  const debouncedOnChange = useDebounced(
    (html: string) => onValue?.(html),
    200
  );

  const isHTMLFormatting = (newHtml: string, oldHtml: string) =>
    newHtml.startsWith('<p style="">') &&
    newHtml.endsWith("</p>") &&
    newHtml.replace('<p style="">', "").replace("</p>", "") === oldHtml;

  const header = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h4 style={{ margin: 0 }}>{label}</h4>
      <button onClick={() => setFull(true)}>Fullscreen</button>
    </div>
  );

  const editorEl = (
    <Editor
      {...props}
      className="h-full min-h-[182px]"
      stringHandler="html"
      initialContent={value}
      imageFormats={resourcesConfig.image.formats}
      imageMaxSize={resourcesConfig.image.maxSize}
      onUploadImage={onUploadImage}
      onChange={(newValue) => {
        const newHtml = toHtml(newValue);
        const oldHtml = value;
        if (newHtml === oldHtml) return;
        if (!isHTMLFormatting(newHtml, oldHtml)) debouncedOnChange(newHtml);
      }}
      onFullScreen={(e) => {
        e?.stopPropagation?.();
        setFull(true);
      }}
    />
  );

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
      }}
    >
      {header}
      {dupFullscreen ? editorEl : !full && editorEl}
      {full && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "grid",
            placeItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setFull(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              width: "90%",
              height: "80%",
              display: "flex",
              flexDirection: "column",
              padding: 12,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ margin: 0 }}>{label} (Fullscreen)</h4>
              <button onClick={() => setFull(false)}>Cerrar</button>
            </div>
            <div style={{ flex: 1, minHeight: 0, marginTop: 8 }}>
              {editorEl}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* layout app-like */
const MultiSectionForm: React.FC<{ dupFullscreen?: boolean }> = ({
  dupFullscreen,
}) => {
  const [intro, setIntro] = useState<string>("<p>Entradilla inicial…</p>");
  const [desc, setDesc] = useState<string>("<p>Descripción larga aquí…</p>");
  const [notes, setNotes] = useState<string>("<p>Notas internas…</p>");

  const pretty = useMemo(
    () => JSON.stringify({ intro, desc, notes }, null, 2),
    [intro, desc, notes]
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 16 }}>
      <div>
        <SectionEditor
          label="Entradilla"
          value={intro}
          onValue={setIntro}
          dupFullscreen={dupFullscreen}
        />
        <SectionEditor
          label="Descripción"
          value={desc}
          onValue={setDesc}
          dupFullscreen={dupFullscreen}
        />
        <SectionEditor
          label="Notas"
          value={notes}
          onValue={setNotes}
          dupFullscreen={dupFullscreen}
        />
      </div>
      <pre
        style={{
          margin: 0,
          background: "#fafafa",
          border: "1px solid #eee",
          borderRadius: 8,
          padding: 12,
          height: "100%",
          whiteSpace: "pre-wrap",
          overflow: "auto",
        }}
      >
        {pretty}
      </pre>
    </div>
  );
};

/** default export CSF */
const meta: Meta = { title: "Editor/App-like" };
export default meta;

type Story = StoryObj;

export const Problematic: Story = {
  render: () => <MultiSectionForm dupFullscreen />,
};

export const Fixed: Story = {
  render: () => <MultiSectionForm dupFullscreen={false} />,
};
