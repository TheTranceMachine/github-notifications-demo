"use client";

import React, { useState, Suspense } from "react";
import cx from "classnames";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectRepositories } from "@/lib/features/repositories/repositoriesSlice";
import { selectNotifications, selectNotificationsStatus } from "@/lib/features/notifications/notificationsSlice";
import {
  selectNewNotifications,
  selectNewNotificationsStatus,
} from "@/lib/features/notifications/newNotificationsSlice";
import { getMoreNotifications } from "@/lib/features/notifications/newNotificationsSlice";
import NotificationsWrapper from "./notifications-wrapper";
import GlobalHeader from "./_components/common/global-header";
import GlobalSideNav from "./_components/common/global-side-nav";

const Notifications = () => {
  const dispatch = useAppDispatch();

  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(!isToggled);

  const allNotifications = useAppSelector(selectNotifications);
  const allNotificationsStatus = useAppSelector(selectNotificationsStatus);
  const allNewNotifications = useAppSelector(selectNewNotifications);
  const allNewNotificationsStatus = useAppSelector(selectNewNotificationsStatus);
  const repositories = useAppSelector(selectRepositories);

  const fetchMoreNotifications = () => {
    dispatch(getMoreNotifications(repositories));
  };

  const collectNewNotifications = () => {
    // dispatch(moveNotifications());
    console.log(allNewNotifications);
  };

  return (
    <>
      <GlobalHeader
        autoRefreshView={fetchMoreNotifications}
        getItems={collectNewNotifications}
        newItemsNumber={allNewNotifications.length}
        itemsLoading={allNewNotificationsStatus === "loading"}
        toggle={toggle}
        isToggled={isToggled}
      />
      <GlobalSideNav activeLink="notifications" isSideNavExpanded={isToggled} />
      <div className={cx({ "main-content--offset": isToggled })}>
        <Suspense fallback={<div>Loading...</div>}>
          <NotificationsWrapper
            allNotifications={allNotifications}
            allNotificationsStatus={allNotificationsStatus}
            repositories={repositories}
          />
        </Suspense>
      </div>
    </>
  );
};

export default Notifications;
