"use client";

import React, { useState } from "react";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableSelectAll,
  TableSelectRow,
  DataTableSkeleton,
} from "@carbon/react";
import classNames from "classnames";
import UseEffects from "./notifications-wrapper";
import DataTableToolbar from "./_components/DataTable/DataTableToolbar";
import GlobalHeaderContainer from "./_components/common/GlobalHeaderContainer";
import { dataTableHeaders, dataTableRows } from "./_components/DataTable/DataTableData";
import { notificationTypes } from "./notification-types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectNotificationsStatus,
  setNotificationAsRead,
  setNotificationSubscription,
} from "@/lib/features/notifications/notificationsSlice";
import { getMoreNotifications } from "@/lib/features/notifications/newNotificationsSlice";

const Notifications = () => {
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState([]);
  const [notificationsTypeSelected, setNotificationsTypeSelected] = useState(notificationTypes);
  const [showAllRead, setShowAllRead] = useState(false);

  const allNotifications = useAppSelector((state) => state.notifications);
  const allNewNotifications = useAppSelector((state) => state.newNotifications);
  const repositories = useAppSelector((state) => state.repositories);

  const toggleShowAll = () => {
    setShowAllRead(!showAllRead);
  };

  const fetchMoreNotifications = () => {
    dispatch(getMoreNotifications(repositories));
  };

  const collectNewNotifications = () => {
    // dispatch(moveNotifications());
    console.log(allNewNotifications);
  };

  const filterByType = (event, id) => {
    const updatedArray = notificationsTypeSelected.map((type) =>
      type.id === id ? { ...type, checked: !type.checked } : type
    );
    setNotificationsTypeSelected(updatedArray);
  };

  const setSubscriptions = (selection, ignored) => {
    selection.forEach(({ id }) => {
      dispatch(setNotificationSubscription({ id, ignored }));
    });
  };

  const markNotificationAsRead = (selection) => {
    selection.forEach(({ id }) => {
      dispatch(setNotificationAsRead(id));
    });
  };

  return (
    <UseEffects
      showAllRead={showAllRead}
      setNotifications={setNotifications}
      allNotifications={allNotifications}
      notificationsTypeSelected={notificationsTypeSelected}
      areNotificationsLoading={selectNotificationsStatus}
      repositories={repositories}
    >
      <GlobalHeaderContainer
        activeLink="notifications"
        showAllRead={showAllRead}
        toggleShowAll={() => toggleShowAll()}
        autoRefreshView={() => fetchMoreNotifications()}
        getItems={() => collectNewNotifications()}
        newItemsNumber={allNewNotifications.length}
        itemsLoading={selectNotificationsStatus}
      >
        <div className="notifications">
          {!notifications.length ? (
            <DataTableSkeleton
              showHeader={false}
              showToolbar={true}
              headers={dataTableHeaders}
              rowCount={5}
              columnCount={7}
              className="notifications__table"
            />
          ) : (
            <DataTable
              isSortable
              rows={dataTableRows(notifications)}
              headers={dataTableHeaders}
              render={({
                rows,
                headers,
                getHeaderProps,
                getSelectionProps,
                getBatchActionProps,
                getRowProps,
                getTableProps,
                onInputChange,
                selectedRows,
              }) => (
                <TableContainer className="notifications__table">
                  <DataTableToolbar
                    onInputChange={onInputChange}
                    filtersChecked={notificationsTypeSelected}
                    setFilter={(e, id) => filterByType(e, id)}
                    getBatchActionProps={getBatchActionProps}
                    selectedRows={selectedRows}
                    setSubscriptions={(selection, ignored) => setSubscriptions(selection, ignored)}
                    setNotificationsAsRead={(selection) => markNotificationAsRead(selection)}
                  />
                  <Table {...getTableProps()}>
                    <TableHead>
                      <TableRow>
                        <TableSelectAll {...getSelectionProps()} />
                        {headers.map((header) => (
                          <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody className="notifications__table__body">
                      {rows.map((row) => (
                        <TableRow
                          {...getRowProps({ row })}
                          className={classNames({
                            "notifications__table__body__row--unread":
                              row.cells[0].info.header === "unread" && row.cells[0].value,
                          })}
                        >
                          <TableSelectRow {...getSelectionProps({ row })} />
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            />
          )}
        </div>
      </GlobalHeaderContainer>
    </UseEffects>
  );
};

export default Notifications;
