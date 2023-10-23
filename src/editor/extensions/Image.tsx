import { useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImageExtension } from "remirror/extensions";
import Button from "../../atoms/button";
import Input from "../../atoms/input";
import ImageIcon from "../assets/icons/Image";
import { Modal, ToolbarButton } from "../components";

export const ImageName = "image";

export type ImageAttrs = {
  accept?: string[];
  onUpload?: (file: File) => Promise<string>;
  resizable?: boolean; // TODO: Not working
  translateFn?: (key: string) => string;
};

const ImageButton: FC<ImageAttrs> = ({
  accept,
  onUpload,
  resizable,
  translateFn,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const { active, commands } = useRemirrorContext({ autoUpdate: true });

  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const [imgAlign, setImgAlign] = useState("");
  const [imgAlt, setImgAlt] = useState("");
  const [imgHeight, setImgHeight] = useState("");
  const [imgRotate, setImgRotate] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imgTitle, setImgTitle] = useState("");
  const [imgWidth, setImgWidth] = useState("");

  const onFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) {
      setError(true);
      return;
    }
    setError(false);
    try {
      onUpload?.(event.target.files![0]).then(setImgSrc);
    } catch (e) {
      setError(true);
    }
  };

  const onSubmit = () => {
    if ((imgSrc || "") === "") return;
    commands.insertImage({
      resizable,
      align:
        imgAlign === "start" ||
        imgAlign === "end" ||
        imgAlign === "left" ||
        imgAlign === "right" ||
        imgAlign === "center" ||
        imgAlign === "justify" ||
        imgAlign === "match-parent"
          ? imgAlign
          : undefined,
      alt: imgAlt,
      height: imgHeight,
      width: imgWidth,
      rotate: imgRotate,
      src: imgSrc,
      title: imgTitle,
    });
    setImgSrc("");
  };

  useEffect(() => {
    setError(false);
    setImgAlign("");
    setImgAlt("");
    setImgHeight("");
    setImgRotate("");
    setImgSrc("");
    setImgTitle("");
    setImgWidth("");
    setShowMoreOptions(false);
  }, [showModal]);

  return (
    <div ref={ref}>
      <ToolbarButton
        className={classNames({ active: showModal || active.image() })}
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <ImageIcon />
      </ToolbarButton>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        parentRef={ref}
      >
        <label>{translateFn?.("url-label") || "Url:"}</label>
        <Input
          autoFocus
          placeholder={translateFn?.("url-placeholder") || "Enter a url"}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setImgSrc(event.target.value)
          }
          value={imgSrc}
          onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
            const { code } = event;

            if (code === "Enter") {
              onSubmit();
              setShowModal(false);
            }

            if (code === "Escape") {
              setShowModal(false);
            }
          }}
        />
        {onUpload && (
          <>
            <p>{translateFn?.("or") || "o"}</p>
            <Input
              accept={accept?.join(", ")}
              onChange={onFile}
              ref={imgRef}
              style={{ display: "none" }}
              type="file"
            />
            <Button
              cta
              onClick={(e) => (e.stopPropagation(), imgRef.current?.click())}
            >
              {translateFn?.("file") || "File"}
            </Button>
          </>
        )}
        {error && (
          <p>
            {translateFn?.("error") ||
              "An error has occurred, please try again."}
          </p>
        )}
        <a
          onClick={(e) => (
            e.stopPropagation(), setShowMoreOptions(!showMoreOptions)
          )}
        >
          {showMoreOptions
            ? translateFn?.("hide-more-options") || "Hide more options"
            : translateFn?.("show-more-options") || "Show more options"}
        </a>
        {showMoreOptions && (
          <>
            <label>{translateFn?.("alt-label") || "Alt:"}</label>
            <Input
              placeholder={translateFn?.("alt-placeholder") || "Enter an alt"}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgAlt(event.target.value)
              }
              value={imgAlt}
            />
            <label>{translateFn?.("title-label") || "Title:"}</label>
            <Input
              placeholder={
                translateFn?.("title-placeholder") || "Enter a title"
              }
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgTitle(event.target.value)
              }
              value={imgTitle}
            />
            <label>{translateFn?.("height-label") || "Height:"}</label>
            <Input
              placeholder={translateFn?.("height-placeholder") || "0"}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgHeight(event.target.value)
              }
              value={imgHeight}
            />
            <label>{translateFn?.("width-label") || "Width:"}</label>
            <Input
              placeholder={translateFn?.("width-placeholder") || "0"}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgWidth(event.target.value)
              }
              value={imgWidth}
            />
            <label>{translateFn?.("align-label") || "Align:"}</label>
            <Input
              placeholder={
                translateFn?.("align-placeholder") ||
                "center | end | justify | left | match-parent | right | start"
              }
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgAlign(event.target.value)
              }
              value={imgAlign}
            />
            <label>{translateFn?.("rotate-label") || "Rotate:"}</label>
            <Input
              placeholder={translateFn?.("rotate-placeholder") || "180deg"}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgRotate(event.target.value)
              }
              value={imgRotate}
            />
          </>
        )}
        <div>
          <Button onClick={() => (onSubmit(), setShowModal(false))}>
            {translateFn?.("save") || "Save"}
          </Button>
          <Button secondary onClick={() => setShowModal(false)}>
            {translateFn?.("cancel") || "Cancel"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export { ImageButton, ImageExtension };
