import { useCurrentSelection, useRemirrorContext } from "@remirror/react";
import classNames from "classnames";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  ApplySchemaAttributes,
  isElementDomNode,
  MarkExtensionSpec,
  omitExtraAttributes,
} from "remirror";
import { LinkExtension as RemirrorLinkExtension } from "remirror/extensions";
import LinkIcon from "../icons/Link";
import { Dropdown, ToolbarButton } from "../components";

export const LinkName = "link";

export type LinkAttrs = {
  autoLink?: boolean;
  linkHandler?: (
    onChange: (value?: string) => void,
    value?: string
  ) => JSX.Element;
};

function useFloatingLinkState() {
  const { to, from } = useCurrentSelection();
  const { chain, attrs } = useRemirrorContext({ autoUpdate: true });

  const hrefLink = (attrs.link()?.href as string) ?? "";
  const [href, setHref] = useState(hrefLink);

  const onRemove = useCallback(() => chain.removeLink().focus().run(), [chain]);

  const onSubmit = useCallback(
    (href: string) => {
      if (href === "") {
        chain.removeLink();
      } else {
        chain.updateLink({ href, target: "_blank", auto: false }, { to, from });
      }

      chain.focus({ to, from }).run();
    },
    [chain, to]
  );

  useEffect(() => {
    setHref(hrefLink);
  }, [hrefLink]);

  return useMemo(
    () => ({
      href,
      onRemove,
      onSubmit,
    }),
    [href, onRemove, onSubmit]
  );
}

const LinkButton: FC<LinkAttrs> = ({ linkHandler }) => {
  const { href, onRemove, onSubmit } = useFloatingLinkState();
  const [showModal, setShowModal] = useState(false);
  const { active } = useRemirrorContext({ autoUpdate: true });

  return (
    <Dropdown
      className="bq-editor-dropdown"
      isOpen={showModal}
      offset="-10 -40"
      onClose={() => setShowModal(false)}
      target={
        <ToolbarButton
          className={classNames({ active: showModal || active.link() })}
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <LinkIcon />
        </ToolbarButton>
      }
    >
      {linkHandler?.((value) => {
        if ((value || "") === "") {
          onRemove();
        } else {
          onSubmit(value);
        }
        setShowModal(false);
      }, href)}
    </Dropdown>
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
