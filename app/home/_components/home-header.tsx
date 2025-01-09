import { Header, HeaderMenuItem, HeaderName, HeaderNavigation } from "@carbon/react";
import Link from "next/link";

const HomeHeader = () => (
  <Header aria-label="Home Header" className="home-header">
    <HeaderName prefix="Github" className="home-header__header-name">
      Notifications
    </HeaderName>
    <HeaderNavigation aria-label="Github Notifications">
      <HeaderMenuItem href="#home" as={Link}>
        Home
      </HeaderMenuItem>
      <HeaderMenuItem href="/notifications" as={Link}>
        Demo
      </HeaderMenuItem>
    </HeaderNavigation>
  </Header>
);

export default HomeHeader;
