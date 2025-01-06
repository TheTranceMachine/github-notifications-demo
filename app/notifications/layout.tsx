"use client";

import { ReactNode, useEffect } from "react";
import { GlobalTheme, Theme } from "@carbon/react";

interface Props {
  readonly children: ReactNode;
}

export default function NotificationsLayout({ children }: Props) {
  const theme = "g100";

  useEffect(() => {
    document.documentElement.dataset.carbonTheme = theme;
  }, [theme]);

  return (
    <GlobalTheme theme={theme}>
      <Theme theme="g100">{children}</Theme>
    </GlobalTheme>
  );
}
