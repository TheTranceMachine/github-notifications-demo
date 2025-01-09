import { ReactNode, useEffect } from "react";
import { Metadata } from "next/types";
import "@/app/styles/home.scss";

export const metadata: Metadata = {
  title: "Github Notifications Home Page",
};

interface Props {
  readonly children: ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return children;
}
