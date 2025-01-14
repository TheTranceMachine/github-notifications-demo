import { ReactNode, useEffect } from "react";
import { Metadata } from "next/types";
import "@/app/styles/notifications.scss";

export const metadata: Metadata = {
  title: "Github Notifications Demo",
};

interface Props {
  readonly children: ReactNode;
}

export default function NotificationsLayout({ children }: Props) {
  return children;
}
