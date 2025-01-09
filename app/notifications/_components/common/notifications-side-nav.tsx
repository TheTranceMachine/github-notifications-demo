import { SideNav, SideNavItems, SideNavLink } from "@carbon/react";

const sideNavLinks = [
  {
    content: "All Notifications",
    id: "notifications",
    link: "/notifications",
  },
];

const NotificationsSideNav = ({ activeLink, isSideNavExpanded }) => (
  <SideNav
    inert={true}
    isPersistent={false}
    expanded={isSideNavExpanded}
    aria-label="Side navigation"
    className="side-nav"
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
