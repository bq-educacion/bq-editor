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
};

const ImageButton: FC<ImageAttrs> = ({ accept, onUpload, resizable }) => {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
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
      {showModal && (
        <Modal>
          <div>
            <label>Url*</label>
            <Input
              autoFocus
              placeholder="Url"
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
                <p>o</p>
                <Input
                  accept={accept?.join(", ")}
                  onChange={onFile}
                  ref={imgRef}
                  style={{ display: "none" }}
                  type="file"
                />
                <Button
                  cta
                  onClick={(e) => (
                    e.stopPropagation(), imgRef.current?.click()
                  )}
                >
                  Archivo
                </Button>
              </>
            )}
          </div>
          {error && <p>An error has occurred, please try again.</p>}
          <a
            onClick={(e) => (
              e.stopPropagation(), setShowMoreOptions(!showMoreOptions)
            )}
          >
            {showMoreOptions ? "Hide" : "Show"} more options
          </a>
          {showMoreOptions && (
            <>
              <div>
                <label>Alt</label>
                <Input
                  placeholder="Alt"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setImgAlt(event.target.value)
                  }
                  value={imgAlt}
                />
              </div>
              <div>
                <label>Title</label>
                <Input
                  placeholder="Title"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setImgTitle(event.target.value)
                  }
                  value={imgTitle}
                />
              </div>
              <div>
                <label>Height</label>
                <Input
                  placeholder="0"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setImgHeight(event.target.value)
                  }
                  value={imgHeight}
                />
              </div>
              <div>
                <label>Width</label>
                <Input
                  placeholder="0"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setImgWidth(event.target.value)
                  }
                  value={imgWidth}
                />
              </div>
              <div>
                <label>Align</label>
                <Input
                  placeholder="center | end | justify | left | match-parent | right | start"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setImgAlign(event.target.value)
                  }
                  value={imgAlign}
                />
              </div>
              <div>
                <label>Rotate</label>
                <Input
                  placeholder="180deg"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setImgRotate(event.target.value)
                  }
                  value={imgRotate}
                />
              </div>
            </>
          )}
          <div>
            <Button secondary onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button onClick={() => (onSubmit(), setShowModal(false))}>
              Guardar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export { ImageButton, ImageExtension };
