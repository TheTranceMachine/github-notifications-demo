import { useEffect, useState } from "react";
import cx from "classnames";
import { processNotifications } from "@/utils/common";
import { useAppDispatch } from "@/lib/hooks";
import { getRepositories } from "@/lib/features/repositories/repositoriesSlice";
import {
  getNotifications,
  setNotificationAsRead,
  setNotificationSubscription,
} from "@/lib/features/notifications/notificationsSlice";
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
import DataTableToolbar from "./_components/DataTable/data-table-toolbar";
import { notificationTypes } from "./notification-types";
import { dataTableHeaders, dataTableRows } from "./_components/DataTable/data-table-data";
import { ProcessedNotification } from "../types";

const NotificationsWrapper = ({ allNotifications, allNotificationsStatus, repositories }) => {
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState([]);
  const [notificationsTypeSelected, setNotificationsTypeSelected] = useState(notificationTypes);

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

  useEffect(() => {
    dispatch(getRepositories({ visibility: "public" }));
  }, []);

  useEffect(() => {
    if (!allNotifications.length && allNotificationsStatus === "idle" && !!repositories.length) {
      dispatch(getNotifications(repositories));
    }
  }, [allNotifications, repositories]);

  useEffect(() => {
    if (!!allNotifications.length) {
      const processedNotifications = processNotifications(allNotifications);
      setNotifications(processedNotifications);
    }
  }, [allNotifications]);

  const countNotifications = (selectedType) => {
    let notificationsByType: ProcessedNotification[] = [];
    allNotifications.forEach((notification: ProcessedNotification) => {
      const { reason: notificationType } = notification;
      if (notificationType === selectedType) notificationsByType.push(notification);
    });
    return notificationsByType;
  };

  useEffect(() => {
    if (!!allNotifications.length) {
      const notificationsByType: ProcessedNotification[] = [];

      notificationsTypeSelected.forEach((notification: ProcessedNotification) => {
        if (notification.checked) notificationsByType.push(...countNotifications(notification.id));
      });
      if (notificationsByType.length) {
        const processedNotifications = processNotifications(notificationsByType);
        setNotifications(processedNotifications);
      }
    }
  }, [notificationsTypeSelected, allNotifications]);

  return (
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
                      <TableHeader {...getHeaderProps({ header })} key={header.key}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className="notifications__table__body">
                  {rows.map((row) => (
                    <TableRow
                      {...getRowProps({ row })}
                      key={row.id}
                      className={cx({
                        "notifications__table__body__row--unread":
                          row.cells[0].info.header === "unread" && row.cells[0].value,
                      })}
                    >
                      <TableSelectRow {...getSelectionProps({ row })} key={row.id} />
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
  );
};

export default NotificationsWrapper;
