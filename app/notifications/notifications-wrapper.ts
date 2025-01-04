import { useEffect } from "react";
import { processNotifications } from "@/utils/common";
import { useAppDispatch } from "@/lib/hooks";
import { getRepositories } from "@/lib/features/repositories/repositoriesSlice";
import { getNotifications } from "@/lib/features/notifications/notificationsSlice";
import { ProcessedNotification } from "../types";

const NotificationsWrapper = ({
  children,
  showAllRead,
  setNotifications,
  allNotifications,
  notificationsTypeSelected,
  areNotificationsLoading,
  repositories,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!repositories.length) {
      dispatch(getRepositories({ visibility: "public" }));
    }
  }, [repositories]);

  useEffect(() => {
    if (!allNotifications.length && areNotificationsLoading === "idle" && !!repositories.length) {
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
    const notificationsByType: ProcessedNotification[] = [];
    notificationsTypeSelected.forEach((notification: ProcessedNotification) => {
      if (notification.checked) notificationsByType.push(...countNotifications(notification.id));
    });
    if (notificationsByType.length) {
      const processedNotifications = processNotifications(notificationsByType);
      setNotifications(processedNotifications);
    }
  }, [notificationsTypeSelected]);

  return children;
};

export default NotificationsWrapper;
