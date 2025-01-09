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
  DataTableRow,
  type GlobalTheme,
} from "@carbon/react";
import DataTableToolbar from "./_components/DataTable/data-table-toolbar";
import { notificationTypes } from "./notification-types";
import { dataTableHeaders, dataTableRows } from "./_components/DataTable/data-table-data";
import { Notification, ProcessedNotification } from "../types";

type NotificationsWrapperProps = {
  allNotifications: Notification[];
  allNotificationsStatus: string;
  repositories: any[];
  theme: typeof GlobalTheme;
};

const NotificationsWrapper = ({
  allNotifications,
  allNotificationsStatus,
  repositories,
  theme,
}: NotificationsWrapperProps) => {
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState([]);
  const [notificationsTypeSelected, setNotificationsTypeSelected] =
    useState<Array<{ id: string; checked: boolean }>>(notificationTypes);

  const filterByType = (id: string) => {
    const updatedArray = notificationsTypeSelected.map((type) =>
      type.id === id ? { ...type, checked: !type.checked } : type
    );
    setNotificationsTypeSelected(updatedArray);
  };

  const setSubscriptions = (selection: DataTableRow<any[]>[], value: boolean) => {
    selection.forEach(({ id }) => {
      dispatch(setNotificationSubscription({ id, ignored: value }));
    });
  };

  const markNotificationAsRead = (selection: DataTableRow<any[]>[]) => {
    selection.forEach(({ id }) => {
      dispatch(setNotificationAsRead({ id }));
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

  const countNotifications = (id: string) => {
    return allNotifications
      .map((notification) => {
        if (notification.reason === id) return notification;
      })
      .filter((notification) => !!notification);
  };

  useEffect(() => {
    if (!!allNotifications.length) {
      const notificationsByType: Notification[] = [];
      notificationsTypeSelected.map((notification) => {
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
                onInputChange={(event: "" | React.ChangeEvent<HTMLInputElement>, value?: string) =>
                  onInputChange(event as React.ChangeEvent<HTMLInputElement>, value)
                }
                filtersChecked={notificationsTypeSelected}
                setFilter={(id) => filterByType(id)}
                getBatchActionProps={getBatchActionProps}
                setSubscriptions={(value) => setSubscriptions(selectedRows, value)}
                setNotificationsAsRead={() => markNotificationAsRead(selectedRows)}
                totalSelected={selectedRows.length}
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
                      className={cx(
                        {
                          "notifications__table__body__row--unread":
                            row.cells[0].info.header === "unread" && row.cells[0].value,
                        },
                        { dark: theme.isDark },
                        { light: !theme.isDark }
                      )}
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
