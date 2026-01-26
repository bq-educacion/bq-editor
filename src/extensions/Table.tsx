import { useRemirrorContext } from "@remirror/react";
import React from "react";
import { TableExtension } from "@remirror/extension-react-tables";
import { ToolbarButton } from "../components";
import TableIcon from "../icons/Table";

export const TableName = "table";

export type TableAttrs = {
  defaultRowsCount?: number;
  defaultColumnsCount?: number;
  defaultWithHeaderRow?: boolean;
};

const TableButton = ({
  defaultRowsCount = 3,
  defaultColumnsCount = 3,
  defaultWithHeaderRow = true,
}: TableAttrs) => {
  const { chain, commands } = useRemirrorContext({ autoUpdate: true });

  const run = (fn: () => void) => {
    chain.focus().run();
    fn();
  };

  return (
    <ToolbarButton
      onClick={() =>
        run(() =>
          commands.createTable({
            rowsCount: defaultRowsCount,
            columnsCount: defaultColumnsCount,
            withHeaderRow: defaultWithHeaderRow,
          })
        )
      }
    >
      <TableIcon />
    </ToolbarButton>
  );
};

export { TableButton, TableExtension };
