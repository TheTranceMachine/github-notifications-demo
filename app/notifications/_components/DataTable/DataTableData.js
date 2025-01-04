import React from "react";
import { DateTime } from "luxon";
import { Button, Tag } from "@carbon/react";
import { Launch, Ticket, NotificationOffFilled, FlagFilled } from "@carbon/icons-react";

const tagReason = (reason) => {
  switch (reason) {
    case "review_requested":
      return (
        <Tag type="red" title={reason} className="notifications__tag--red">
          {reason}
        </Tag>
      );
    case "mention":
      return (
        <Tag type="green" title={reason} className="notifications__tag--green">
          {reason}
        </Tag>
      );
    case "author":
      return (
        <Tag type="blue" title={reason} className="notifications__tag--blue">
          {reason}
        </Tag>
      );
    default:
      return (
        <Tag type="gray" title={reason} className="notifications__tag--gray">
          {reason}
        </Tag>
      );
  }
};

const onClick = (id, html_url) => {
  const dispatch = useAppDispatch();
  const processedId = id.split("-")[0];
  dispatch(setNotificationAsRead(processedId));
  window.open(html_url, "_blank");
};

const actions = (id, html_url, jira) => (
  <div className="notifications__table__actions">
    <Button
      kind="secondary"
      renderIcon={Launch}
      iconDescription="Github"
      hasIconOnly
      size="sm"
      onClick={() => onClick(id, html_url)}
    />
    {jira && (
      <Button
        kind="secondary"
        renderIcon={Ticket}
        iconDescription="Jira"
        hasIconOnly
        size="sm"
        onClick={() => window.open(`https://**REMOVED**/browse/${jira}`, "_blank")}
      />
    )}
  </div>
);

export const dataTableHeaders = [
  {
    key: "unread",
    header: <FlagFilled />,
  },
  {
    key: "muted",
    header: <NotificationOffFilled />,
  },
  {
    key: "repo",
    header: "Repo",
  },
  {
    key: "title",
    header: "PR title",
  },
  {
    key: "updated_at",
    header: "Last updated",
  },
  {
    key: "reason",
    header: "Reason",
  },
  {
    key: "actions",
    header: "Actions",
  },
];

export const dataTableRows = (notifications) => {
  let mappedNotifications = [];
  notifications.forEach((notification) => {
    const { id, reason, updated_at, title, html_url, full_name, ignored, unread, jira } = notification;
    mappedNotifications.push({
      id,
      repo: full_name,
      title,
      reason: tagReason(reason),
      // updated_at: moment(moment.utc(updated_at).toDate()).local().format("YYYY-MM-DD HH:mm:ss"),
      updated_at: DateTime.fromISO(updated_at).toFormat("yyyy-MM-dd HH:mm:ss"),
      actions: actions(id, html_url, jira),
      muted: ignored ? <NotificationOffFilled /> : null,
      unread: unread ? <FlagFilled /> : null,
    });
  });
  return mappedNotifications;
};
