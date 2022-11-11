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
import { adjustColorOpacity, colors } from "../../theme";
import LinkIcon from "../assets/icons/Link";
import { ToolbarButton } from "../utils";

// TODO: Control link attributes

function useFloatingLinkState() {
  const { link } = useAttrs();
  const chain = useChainedCommands();
  const { to, from } = useCurrentSelection();

  const url = (link()?.href as string) ?? "";
  const [href, setHref] = useState(url);

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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    !showModal && setHref("");
  }, [showModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) =>
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      setShowModal(false);

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref}>
      <ToolbarButton
        className={classNames({ active: showModal || active.link() })}
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <LinkIcon />
      </ToolbarButton>
      {showModal && (
        <Modal>
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
                setShowModal(false);
              }

              if (code === "Escape") {
                setShowModal(false);
              }
            }}
          />
          {active.link() ? (
            <Button danger onClick={() => (onRemove(), setShowModal(false))}>
              Eliminar
            </Button>
          ) : (
            <Button onClick={() => (onSubmit(), setShowModal(false))}>
              Guardar
            </Button>
          )}
        </Modal>
      )}
    </div>
  );
};

export { LinkButton, LinkExtension };

const Modal = styled.div`
  align-items: center;
  background-color: ${colors.white};
  border: solid 1px ${colors.grey4};
  border-radius: 4px;
  box-shadow: 0 10px 20px 0 ${adjustColorOpacity(colors.dark, 0.2)};
  color: ${colors.dark};
  padding: 20px;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 2;
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;
