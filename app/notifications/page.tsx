"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import cx from "classnames";
import { useTheme } from "@carbon/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectRepositories } from "@/lib/features/repositories/repositoriesSlice";
import {
  selectNotifications,
  selectNotificationsStatus,
  selectNewNotifications,
  selectNewNotificationsStatus,
  getMoreNotifications,
  moveNotifications,
} from "@/lib/features/notifications/notificationsSlice";
import NotificationsWrapper from "./notifications-wrapper";
import NotificationsHeader from "./_components/common/notifications-header";
import NotificationsSideNav from "./_components/common/notifications-side-nav";

const Notifications = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isToggled, setIsToggled] = useState(false);

  const allNotifications = useAppSelector(selectNotifications);
  const allNotificationsStatus = useAppSelector(selectNotificationsStatus);
  const allNewNotifications = useAppSelector(selectNewNotifications);
  const allNewNotificationsStatus = useAppSelector(selectNewNotificationsStatus);
  const repositories = useAppSelector(selectRepositories);

  const fetchMoreNotifications = () => {
    dispatch(getMoreNotifications(repositories));
  };

  const collectNewNotifications = () => {
    dispatch(moveNotifications());
  };

  return (
    <>
      <NotificationsHeader
        autoRefreshView={fetchMoreNotifications}
        getItems={collectNewNotifications}
        newItemsNumber={allNewNotifications.length}
        itemsLoading={allNewNotificationsStatus === "loading"}
        toggle={() => setIsToggled(!isToggled)}
        isToggled={isToggled}
        navigate={() => router.push("/home")}
        theme={theme}
      />
      <NotificationsSideNav activeLink="notifications" isSideNavExpanded={isToggled} />
      <div className={cx({ "main-content--offset": isToggled })}>
        <NotificationsWrapper
          allNotifications={allNotifications}
          allNotificationsStatus={allNotificationsStatus}
          repositories={repositories}
        />
      </div>
    </>
  );
};

export default Notifications;
