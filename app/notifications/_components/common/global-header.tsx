import React from "react";
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, Button, Toggle } from "@carbon/react";
import { SidePanelCloseFilled, SidePanelOpenFilled, Renew, UserAvatarFilledAlt } from "@carbon/icons-react";

const GlobalHeader = ({ autoRefreshView, getItems, newItemsNumber, itemsLoading, toggle, isToggled, navigate }) => (
  <Header aria-label="Github Notifications" className="global-header">
    <Button
      aria-label="Open side menu"
      onClick={toggle}
      kind="secondary"
      renderIcon={isToggled ? SidePanelCloseFilled : SidePanelOpenFilled}
      iconDescription="Side menu"
      hasIconOnly
      className="global-header__side-nav-toggle"
    />
    <HeaderName prefix="Github" className="global-header__header-name">
      Notifications
    </HeaderName>
    <HeaderGlobalBar>
      <HeaderGlobalAction onClick={autoRefreshView} aria-label="CHECK FOR NEW">
        <Renew className={`global-header__refresh-icon ${itemsLoading ? "global-header__refresh-icon--spin" : ""}`} />
      </HeaderGlobalAction>
      <HeaderGlobalAction onClick={getItems} aria-label="NEW">
        <div className="global-header__new-notifications-icon">{newItemsNumber}</div>
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="LOG OUT" onClick={navigate}>
        <UserAvatarFilledAlt />
      </HeaderGlobalAction>
    </HeaderGlobalBar>
  </Header>
);

export default GlobalHeader;
