import { SideNav, SideNavItems, SideNavLink } from "@carbon/react";
import cx from "classnames";

const sideNavLinks = [
  {
    content: "All Notifications",
    id: "notifications",
    link: "/notifications",
  },
];

type NotificationsSideNavTypes = {
  activeLink: string;
  isSideNavExpanded: boolean;
  theme: { isDark: boolean };
};

const NotificationsSideNav = ({ activeLink, isSideNavExpanded, theme }: NotificationsSideNavTypes) => (
  <SideNav
    inert={true}
    isPersistent={false}
    expanded={isSideNavExpanded}
    aria-label="Side navigation"
    className={cx("side-nav", { dark: theme.isDark }, { light: !theme.isDark })}
  >
    <SideNavItems>
      {sideNavLinks.map((sideNavLink) => (
        <SideNavLink isActive={activeLink === sideNavLink.id} href={sideNavLink.link} key={sideNavLink.id}>
          {sideNavLink.content}
        </SideNavLink>
      ))}
    </SideNavItems>
  </SideNav>
);

export default NotificationsSideNav;
