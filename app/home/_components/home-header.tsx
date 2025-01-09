import { Header, HeaderMenuItem, HeaderName, HeaderNavigation } from "@carbon/react";

const HomeHeader = () => (
  <Header aria-label="Home Header" className="home-header">
    <HeaderName prefix="Github" className="home-header__header-name">
      Notifications
    </HeaderName>
    <HeaderNavigation aria-label="Github Notifications">
      <HeaderMenuItem href="#home">Home</HeaderMenuItem>
      <HeaderMenuItem href="/notifications">Demo</HeaderMenuItem>
    </HeaderNavigation>
  </Header>
);

export default HomeHeader;