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
import { colors } from "../../theme";
import ImageIcon from "../assets/icons/Image";
import ToolbarButton from "../ToolbarButton";

const ImageButton: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const active = useActive();
  const { insertImage } = useCommands();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const [imgAlign, setImgAlign] = useState<string>("");
  const [imgAlt, setImgAlt] = useState<string>("");
  const [imgHeight, setImgHeight] = useState<string>("");
  const [imgRotate, setImgRotate] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgTitle, setImgTitle] = useState<string>("");
  const [imgWidth, setImgWidth] = useState<string>("");

  const onRemove = () => console.log("TODO");

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
            <input
              autoFocus
              placeholder="Enter url..."
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
          </div>
          <div>
            <label>Alt</label>
            <input
              placeholder="Enter alt..."
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgAlt(event.target.value)
              }
              value={imgAlt}
            />
          </div>
          <div>
            <label>Title</label>
            <input
              placeholder="Enter title..."
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgTitle(event.target.value)
              }
              value={imgTitle}
            />
          </div>
          <div>
            <label>Height</label>
            <input
              placeholder="Enter height..."
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgHeight(event.target.value)
              }
              value={imgHeight}
            />
          </div>
          <div>
            <label>Width</label>
            <input
              placeholder="Enter width..."
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgWidth(event.target.value)
              }
              value={imgWidth}
            />
          </div>
          <div>
            <label>Align</label>
            <input
              placeholder="center | end | justify | left | match-parent | right | start"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgAlign(event.target.value)
              }
              value={imgAlign}
            />
          </div>
          <div>
            <label>Rotate</label>
            <input
              placeholder="Enter rotate..."
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setImgRotate(event.target.value)
              }
              value={imgRotate}
            />
          </div>
          {active.image() ? (
            <Button danger onClick={() => (onRemove(), setShowTooltip(false))}>
              Eliminar
            </Button>
          ) : (
            <div>
              <Button
                secondary
                onClick={() => (onSubmit(), setShowTooltip(false))}
              >
                Cancelar
              </Button>
              <Button onClick={() => (onSubmit(), setShowTooltip(false))}>
                Guardar
              </Button>
            </div>
          )}
        </Tooltip>
      )}
    </div>
  );
};

export { ImageButton, ImageExtension };

const Tooltip = styled.div`
  background-color: ${colors.white};
  border: 2px solid ${colors.grey4};
  border-radius: 4px;
  color: ${colors.dark};
  padding: 20px;
  position: absolute;
  transform: translate(calc(20px - 50%), 5px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;

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

    input {
      box-sizing: border-box;
      height: 40px;
      width: 100%;
      padding: 0 10px;
    }
  }

  &::before {
    content: "";
    background-color: ${colors.white};
    border-left: 2px solid ${colors.grey4};
    border-top: 2px solid ${colors.grey4};
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    transform: translate(-50%, 0) rotate(45deg);
    top: -12px;
    left: 50%;
  }
`;
