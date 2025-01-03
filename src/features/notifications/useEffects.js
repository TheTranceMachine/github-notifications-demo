import { useEffect } from "react";
import { getMoreNotifications, getNotifications } from "../../actions/notifications";
import { getRepositories } from "../../actions/repositories";
import { processNotifications } from "../../utils/common";

const UseEffects = (
  {
    children,
    showAllRead,
    setNotifications,
    allNotifications,
    notificationsTypeSelected,
    areNotificationsLoading,
    dispatch,
    subscriptions,
    repositories,
  }) => {

  useEffect(() => {
    if (!repositories.length) {
      dispatch(getRepositories());
    }
  }, [repositories]);

  useEffect(() => {
    if (!allNotifications.length && !areNotificationsLoading && !!repositories.length) {
      dispatch(getNotifications(showAllRead));
    }
  }, [allNotifications, repositories]);

  useEffect(() => {
    if (!!allNotifications.length) {
      const processedNotifications = processNotifications(allNotifications);
      setNotifications(processedNotifications);
    }
  }, [allNotifications]);

  const countNotifications = (selectedType) => {
    let notificationsByType = [];
    allNotifications.forEach((notification) => {
      const { reason: notificationType } = notification;
      if (notificationType === selectedType) notificationsByType.push(notification);
    });
    return notificationsByType;
  };

  useEffect(() => {
    const notificationsByType = [];
    notificationsTypeSelected.forEach((type) => {
      if (type.checked) notificationsByType.push(...countNotifications(type.id));
    });
    if (notificationsByType.length) {
      const processedNotifications = processNotifications(notificationsByType);
      setNotifications(processedNotifications);
    }
  }, [notificationsTypeSelected]);

  return children;
}

export default UseEffects;