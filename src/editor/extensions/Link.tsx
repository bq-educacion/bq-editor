import styled from "@emotion/styled";
import {
  useActive,
  useAttrs,
  useChainedCommands,
  useCurrentSelection,
} from "@remirror/react";
import classNames from "classnames";
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LinkExtension } from "remirror/extensions";
import Button from "../../button";
import Input from "../../input";
import { colors } from "../../theme";
import LinkIcon from "../assets/icons/Link";
import ToolbarButton from "../ToolbarButton";

function useFloatingLinkState() {
  const { link } = useAttrs();
  const chain = useChainedCommands();
  const { to, from } = useCurrentSelection();

  const url = (link()?.href as string) ?? "";
  const [href, setHref] = useState<string>(url);

  const onRemove = useCallback(() => chain.removeLink().focus().run(), [chain]);

  const onSubmit = useCallback(() => {
    if (href === "") {
      chain.removeLink();
    } else {
      chain.updateLink({ href, auto: false }, { to, from });
    }

    chain.focus({ to, from }).run();
  }, [chain, href, to]);

  useEffect(() => {
    setHref(url);
  }, [url]);

  return useMemo(
    () => ({
      href,
      setHref,
      onRemove,
      onSubmit,
    }),
    [href, setHref, onRemove, onSubmit]
  );
}

const LinkButton: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const active = useActive();
  const { href, setHref, onRemove, onSubmit } = useFloatingLinkState();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    !showTooltip && setHref("");
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
        className={classNames({ active: showTooltip || active.link() })}
        onClick={() => {
          setShowTooltip(!showTooltip);
        }}
      >
        <LinkIcon />
      </ToolbarButton>
      {showTooltip && (
        <Tooltip>
          <Input
            autoFocus
            placeholder="Enter link..."
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setHref(event.target.value)
            }
            value={href}
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
          {active.link() ? (
            <Button danger onClick={() => (onRemove(), setShowTooltip(false))}>
              Eliminar
            </Button>
          ) : (
            <Button onClick={() => (onSubmit(), setShowTooltip(false))}>
              Guardar
            </Button>
          )}
        </Tooltip>
      )}
    </div>
  );
};

export { LinkButton, LinkExtension };

const Tooltip = styled.div`
  align-items: center;
  background-color: ${colors.white};
  border: 2px solid ${colors.grey5};
  border-radius: 4px;
  color: ${colors.dark};
  padding: 20px;
  position: absolute;
  transform: translate(calc(20px - 50%), 5px);
  z-index: 2;
  display: flex;
  gap: 10px;
  justify-content: space-between;

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
