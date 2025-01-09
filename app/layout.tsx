"use client";

import { useEffect, useState, type ReactNode } from "react";
import { GlobalTheme, Theme } from "@carbon/react";
import { StoreProvider } from "./StoreProvider";
import ThemeSwitcher from "./_components/theme-switcher";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [theme, setTheme] = useState("g100");

  useEffect(() => {
    document.documentElement.dataset.carbonTheme = theme;
  }, [theme]);

  return (
    <StoreProvider>
      <html lang="en">
        <body style={{ backgroundColor: theme === "g100" ? "#171717" : "#f4f4f4" }}>
          <GlobalTheme theme={theme}>
            <Theme theme={theme}>
              <ThemeSwitcher
                switchTheme={() => setTheme((theme) => (theme === "g100" ? "g10" : "g100"))}
                theme={theme}
              />
              {children}
            </Theme>
          </GlobalTheme>
        </body>
      </html>
    </StoreProvider>
  );
}
