import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
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
import {
  ApplySchemaAttributes,
  isElementDomNode,
  MarkExtensionSpec,
  omitExtraAttributes,
} from "remirror";
import { LinkExtension as RemirrorLinkExtension } from "remirror/extensions";
import Button from "../../atoms/button";
// import Checkbox from "../../atoms/checkbox";
import Input from "../../atoms/input";
import LinkIcon from "../assets/icons/Link";
import { Modal, ToolbarButton } from "../components";

export const LinkName = "link";

export type LinkAttrs = {
  autoLink?: boolean;
  defaultTarget?: string;
};

function useFloatingLinkState() {
  const { to, from } = useCurrentSelection();
  const { chain, attrs } = useRemirrorContext({ autoUpdate: true });

  const hrefLink = (attrs.link()?.href as string) ?? "";
  const targetLink = (attrs.link()?.target as string) ?? "";
  const [href, setHref] = useState(hrefLink);
  const [target, setTarget] = useState(targetLink);

  const onRemove = useCallback(() => chain.removeLink().focus().run(), [chain]);

  const onSubmit = useCallback(() => {
    if (href === "") {
      chain.removeLink();
    } else {
      chain.updateLink({ href, target, auto: false }, { to, from });
    }

    chain.focus({ to, from }).run();
  }, [chain, href, target, to]);

  useEffect(() => {
    setHref(hrefLink);
  }, [hrefLink]);

  useEffect(() => {
    setTarget(targetLink);
  }, [targetLink]);

  return useMemo(
    () => ({
      href,
      setHref,
      target,
      setTarget,
      onRemove,
      onSubmit,
    }),
    [href, setHref, target, setTarget, onRemove, onSubmit]
  );
}

const LinkButton: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { href, setHref, onRemove, onSubmit } = useFloatingLinkState();
  const [showModal, setShowModal] = useState(false);
  const { active } = useRemirrorContext({ autoUpdate: true });

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
        className={classNames({ active: showModal || active.link() })}
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <LinkIcon />
      </ToolbarButton>
      {showModal && (
        <Modal>
          <div>
            <label>Link*</label>
            <Input
              autoFocus
              placeholder="Link"
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
          </div>
          {/* <div> // TODO: Not working
            <Checkbox
              checked={target === "_blank"}
              onChange={(checked) => setTarget(checked ? "_blank" : "_self")}
            />
            <label>Open in new tab</label>
          </div> */}
          <div>
            {active.link() ? (
              <Button danger onClick={() => (onRemove(), setShowModal(false))}>
                Eliminar
              </Button>
            ) : (
              <Button secondary onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
            )}
            <Button onClick={() => (onSubmit(), setShowModal(false))}>
              Guardar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// TODO: Workaround cause _blank attr is not working
class LinkExtension extends RemirrorLinkExtension {
  createMarkSpec(extra: ApplySchemaAttributes): MarkExtensionSpec {
    return {
      attrs: {
        ...extra.defaults(),
        href: {},
        auto: { default: false },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs: (node) => {
            if (!isElementDomNode(node)) {
              return false;
            }

            const href = node.getAttribute("href");
            const auto = this.options.autoLinkRegex.test(
              node.textContent ?? ""
            );
            return { ...extra.parse(node), href, auto };
          },
        },
      ],
      toDOM: (node) => {
        const { auto: _, ...rest } = omitExtraAttributes(node.attrs, extra);
        const rel = "noopener noreferrer nofollow";
        const attrs = {
          ...extra.dom(node),
          ...rest,
          rel,
          target: "_blank",
        };

        return ["a", attrs, 0];
      },
    };
  }
}

export { LinkButton, LinkExtension };
