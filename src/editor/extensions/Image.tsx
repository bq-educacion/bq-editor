import styled from "@emotion/styled";
import { useActive, useCommands } from "@remirror/react";
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
import Button from "../../button";
import Input from "../../input";
import { colors } from "../../theme";
import ImageIcon from "../assets/icons/Image";
import ToolbarButton from "../ToolbarButton";

interface IImageProps {
  accept?: string[];
  onUpload?: (file: File) => Promise<string>;
}

const ImageButton: FC<IImageProps> = ({ accept, onUpload }) => {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const active = useActive();
  const { insertImage } = useCommands();

  const [error, setError] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

  const [imgAlign, setImgAlign] = useState<string>("");
  const [imgAlt, setImgAlt] = useState<string>("");
  const [imgHeight, setImgHeight] = useState<string>("");
  const [imgRotate, setImgRotate] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgTitle, setImgTitle] = useState<string>("");
  const [imgWidth, setImgWidth] = useState<string>("");

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
    insertImage({
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
  }, [showTooltip]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) =>
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      setShowTooltip(false);

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref}>
      <ToolbarButton
        className={classNames({ active: showTooltip || active.image() })}
        onClick={() => {
          setShowTooltip(!showTooltip);
          focus();
        }}
      >
        <ImageIcon />
      </ToolbarButton>
      {showTooltip && (
        <Tooltip>
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
                  setShowTooltip(false);
                }

                if (code === "Escape") {
                  setShowTooltip(false);
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
          {!showMoreOptions ? (
            <a onClick={(e) => (e.stopPropagation(), setShowMoreOptions(true))}>
              Show more options
            </a>
          ) : (
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
            <Button secondary onClick={() => setShowTooltip(false)}>
              Cancelar
            </Button>
            <Button onClick={() => (onSubmit(), setShowTooltip(false))}>
              Guardar
            </Button>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export { ImageButton, ImageExtension };

const Tooltip = styled.div`
  background-color: ${colors.white};
  border: 2px solid ${colors.grey5};
  border-radius: 4px;
  color: ${colors.dark};
  padding: 20px;
  position: absolute;
  transform: translate(calc(20px - 50%), 5px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 386px;

  a {
    cursor: pointer;
    color: ${colors.orange1};
  }

  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    button {
      flex: 1;
    }

    label {
      font-weight: bold;
      margin-bottom: -5px;
      min-width: 45px;
    }
  }

  &::before {
    content: "";
    background-color: ${colors.white};
    border-left: 2px solid ${colors.grey5};
    border-top: 2px solid ${colors.grey5};
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    transform: translate(-50%, 0) rotate(45deg);
    top: -12px;
    left: 50%;
  }
`;
