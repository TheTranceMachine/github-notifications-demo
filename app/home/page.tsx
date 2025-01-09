"use client";

import { Content, FlexGrid, Stack, useTheme } from "@carbon/react";
import cx from "classnames";
import HomeHero from "./_components/home-hero";
import HomeHeader from "./_components/home-header";
import HomeFooter from "./_components/home-footer";

export default function HomePage() {
  const theme = useTheme() as { isDark: boolean };

  return (
    <Stack>
      <HomeHeader />
      <Content className={cx("home-content", { dark: theme.isDark }, { light: !theme.isDark })}>
        <FlexGrid>
          <HomeHero theme={theme} />
        </FlexGrid>
      </Content>
      <HomeFooter theme={theme} />
    </Stack>
  );
}
