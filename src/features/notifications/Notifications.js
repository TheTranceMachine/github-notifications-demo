import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
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
  DataTableSkeleton
} from 'carbon-components-react';
import classNames from 'classnames';
import UseEffects from "./useEffects";
import DataTableToolbar from './DataTable/DataTableToolbar';
import GlobalHeaderContainer from '../common/GlobalHeaderContainer';
import GlobalInlineNotifications from '../common/GlobalInlineNotifications';
import { getMoreNotifications, moveNotifications, setNotificationAsRead, setSubscription } from '../../actions/notifications';
import { dataTableHeaders, dataTableRows } from './DataTable/DataTableData';
import notificationTypes from './notificationTypes';

const Notifications = () => {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const [notificationsTypeSelected, setNotificationsTypeSelected] = useState(notificationTypes);
  const [showAllRead, setShowAllRead] = useState(false);

  const allNotifications = useSelector((state) => state.notifications.notifications);
  const allNewNotifications = useSelector((state) => state.notifications.newNotifications);
  const areNotificationsLoading = useSelector((state) => state.notifications.areNotificationsLoading);
  const repositories = useSelector((state) => state.repositories.repositories);

  const toggleShowAll = () => {
    setShowAllRead(!showAllRead);
  }

  const fetchMoreNotifications = () => {
    dispatch(getMoreNotifications());
  }

  const collectNewNotifications = () => {
    dispatch(moveNotifications());
  }

  const filterByType = (event, id) => {
    const updatedArray = notificationsTypeSelected.map(
      (type) =>
        (type.id === id ? { ...type, checked: !type.checked } : type)
    );
    setNotificationsTypeSelected(updatedArray);
  }

  const setSubscriptions = (selection, ignored) => {
    selection.forEach(({ id }) => {
      dispatch(setSubscription({ id, ignored }));
    })
  }

  const markNotificationAsRead = (selection) => {
    selection.forEach(({ id }) => {
      dispatch(setNotificationAsRead(id));
    })
  }

  return (
    <UseEffects
      showAllRead={showAllRead}
      setNotifications={setNotifications}
      allNotifications={allNotifications}
      notificationsTypeSelected={notificationsTypeSelected}
      allNewNotifications={allNewNotifications}
      areNotificationsLoading={areNotificationsLoading}
      repositories={repositories}
      dispatch={dispatch}
    >
      <GlobalHeaderContainer
        activeLink="notifications"
        showAllRead={showAllRead}
        toggleShowAll={() => toggleShowAll()}
        autoRefreshView={() => fetchMoreNotifications()}
        getItems={() => collectNewNotifications()}
        newItemsNumber={allNewNotifications.length}
        itemsLoading={areNotificationsLoading}
      >
        <div className="notifications">
          <GlobalInlineNotifications />
          {!notifications.length
            ? <DataTableSkeleton
              showHeader={false}
              showToolbar={true}
              headers={dataTableHeaders}
              rowCount={5}
              columnCount={7}
              className="notifications__table"
            />
            : (
              <DataTable
                isSortable
                rows={dataTableRows(dispatch, notifications)}
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
                  selectedRows
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
                            <TableHeader {...getHeaderProps({ header })}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody className="notifications__table__body">
                        {rows.map((row) => (
                          <TableRow
                            {...getRowProps({ row })}
                            className={classNames({
                              'notifications__table__body__row--unread':
                                row.cells[0].info.header === 'unread' && row.cells[0].value
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
            )
          }
        </div>
      </GlobalHeaderContainer>
    </UseEffects>
  );
}

export default Notifications;
