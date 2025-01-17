import { DateTime } from "luxon";
import { Button, Tag } from "@carbon/react";
import { Launch, NotificationOffFilled, FlagFilled } from "@carbon/icons-react";
import { ProcessedNotification } from "@/app/types";

const tagReason = (reason: string) => {
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

const onClick = (id: string, html_url: string | URL | undefined) => {
  // demo code to open the PR in a new tab
  // set as read
  // window.open(html_url, "_blank");
  console.log(id, html_url);
};

const actions = (id: string, html_url: string | URL | undefined) => (
  <div className="notifications__table__actions">
    <Button
      kind="secondary"
      renderIcon={Launch}
      iconDescription="Github"
      hasIconOnly
      size="sm"
      onClick={() => onClick(id, html_url)}
    />
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

export const dataTableRows = (notifications: ProcessedNotification[]) => {
  return notifications.map(({ id, reason, updated_at, title, html_url, full_name, ignored, unread }) => ({
    id,
    repo: full_name,
    title,
    reason: tagReason(reason),
    updated_at: DateTime.fromISO(updated_at).toFormat("yyyy-MM-dd HH:mm:ss"),
    actions: actions(id, html_url),
    muted: ignored ? <NotificationOffFilled /> : null,
    unread: unread ? <FlagFilled /> : null,
  }));
};
