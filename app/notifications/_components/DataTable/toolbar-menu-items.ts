type ToolbarMenuItemsTypes = {
  id: string;
  label: string;
};

const toolbarMenuItems = [
  {
    id: "subscribed",
    label: "Subscribed",
  },
  {
    id: "review_requested",
    label: "Review requested",
  },
  {
    id: "mention",
    label: "Mentioned",
  },
  {
    id: "author",
    label: "Authored",
  },
];

export { toolbarMenuItems };
export type { ToolbarMenuItemsTypes };
