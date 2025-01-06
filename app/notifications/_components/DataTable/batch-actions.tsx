const { NotificationOff, Notification } = require("@carbon/icons-react");

type BatchActionsTypes = {
  id: string;
  text: string;
  icon: any;
  value: boolean;
};

const batchActions = [
  {
    id: "mute",
    text: "Mute",
    icon: NotificationOff,
    value: true,
  },
  {
    id: "unmute",
    text: "Unmute",
    icon: Notification,
    value: false,
  },
];

export { batchActions };
export type { BatchActionsTypes };
