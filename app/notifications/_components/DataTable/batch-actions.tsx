const { NotificationOff, Notification } = require("@carbon/icons-react");

export const batchActions = [
  {
    id: "mute",
    text: "Mute",
    icon: NotificationOff,
    bool: true,
  },
  {
    id: "unmute",
    text: "Unmute",
    icon: Notification,
    bool: false,
  },
];
