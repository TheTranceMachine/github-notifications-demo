import React from "react";
import {
  TableBatchAction,
  TableBatchActions,
  TableToolbar,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
  Checkbox,
} from "@carbon/react";
import { CheckmarkOutline } from "@carbon/icons-react";
import { toolbarMenuItems, ToolbarMenuItemsTypes } from "./toolbar-menu-items";
import { batchActions, BatchActionsTypes } from "./batch-actions";

type DataTableToolbarProps = {
  onInputChange: (e: "" | React.ChangeEvent<HTMLInputElement>, value: string | undefined) => void;
  filtersChecked: { id: string; checked: boolean }[];
  setFilter: (id: string) => void;
  getBatchActionProps: () => { shouldShowBatchActions: boolean };
  setSubscriptions: (value: boolean) => void;
  setNotificationsAsRead: () => void;
  totalSelected: number;
};

const DataTableToolbar = ({
  onInputChange,
  filtersChecked,
  setFilter,
  getBatchActionProps,
  setSubscriptions,
  setNotificationsAsRead,
  totalSelected,
}: DataTableToolbarProps) => {
  const checkboxComponent = ({ id, label }: ToolbarMenuItemsTypes) => (
    <Checkbox
      key={id}
      id={id}
      labelText={label}
      checked={filtersChecked.find((el) => el.id === id)?.checked || false}
      onClick={() => setFilter(id)}
      className="notifications__table__toolbar__checkbox"
    />
  );

  const batchActionsComponent = ({ id, icon, text, value }: BatchActionsTypes) => (
    <TableBatchAction
      key={id}
      tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
      renderIcon={icon}
      onClick={() => setSubscriptions(value)}
    >
      {text}
    </TableBatchAction>
  );

  return (
    <TableToolbar aria-label="data table toolbar" className="notifications__table__toolbar">
      <TableBatchActions
        onCancel={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
          console.log("Cancel", event);
        }}
        totalSelected={totalSelected}
        {...getBatchActionProps()}
      >
        {batchActions.map((button) => batchActionsComponent(button))}
        <TableBatchAction
          key="read"
          tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
          renderIcon={CheckmarkOutline}
          onClick={setNotificationsAsRead}
        >
          Mark as read
        </TableBatchAction>
      </TableBatchActions>
      <TableToolbarContent>
        <TableToolbarSearch onChange={(event, value) => onInputChange(event, value)} persistent />
        <TableToolbarMenu>{toolbarMenuItems.map((item) => checkboxComponent(item))}</TableToolbarMenu>
      </TableToolbarContent>
    </TableToolbar>
  );
};

export default DataTableToolbar;
