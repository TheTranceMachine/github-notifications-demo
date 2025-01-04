import React from "react";
import { InlineNotification } from "@carbon/react";

const component = (props) => (
  <InlineNotification
    kind={props.kind}
    subtitle={props.subtitle}
    title={props.title}
    lowContrast={true}
    className="notifications__inline"
  />
);

const GlobalInlineNotifications = ({ isSettingSubscriptionLoading, hasSettingSubscriptionError }) => {
  return (
    <>
      {hasSettingSubscriptionError &&
        !isSettingSubscriptionLoading &&
        component({
          kind: "error",
          title: "Mute Notifications",
          subtitle: "Something went wrong. You have not changed subscriptions of the requested notifications.",
        })}
    </>
  );
};

export default GlobalInlineNotifications;
