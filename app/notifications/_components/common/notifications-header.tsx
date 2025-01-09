import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, Button, Toggle } from "@carbon/react";
import { SidePanelCloseFilled, SidePanelOpenFilled, Renew, UserAvatarFilledAlt } from "@carbon/icons-react";
import cx from "classnames";

type NotificationsHeaderTypes = {
  autoRefreshView: () => void;
  getItems: () => void;
  newItemsNumber: number;
  itemsLoading: boolean;
  toggle: () => void;
  isToggled: boolean;
  navigate: () => void;
  theme: { isDark: boolean };
};

const NotificationsHeader = ({
  autoRefreshView,
  getItems,
  newItemsNumber,
  itemsLoading,
  toggle,
  isToggled,
  navigate,
  theme,
}: NotificationsHeaderTypes) => (
  <Header
    aria-label="Github Notifications"
    className={cx("notifications-header", { dark: theme.isDark }, { light: !theme.isDark })}
  >
    <Button
      aria-label="Open side menu"
      onClick={toggle}
      kind="secondary"
      renderIcon={isToggled ? SidePanelCloseFilled : SidePanelOpenFilled}
      iconDescription="Side menu"
      hasIconOnly
      className="notifications-header__side-nav-toggle"
    />
    <HeaderName prefix="Github" className="notifications-header__header-name">
      Notifications
    </HeaderName>
    <HeaderGlobalBar>
      <HeaderGlobalAction onClick={autoRefreshView} aria-label="CHECK FOR NEW">
        <Renew
          className={`notifications-header__refresh-icon ${itemsLoading ? "notifications-header__refresh-icon--spin" : ""}`}
        />
      </HeaderGlobalAction>
      <HeaderGlobalAction onClick={getItems} aria-label="NEW">
        <div className="notifications-header__new-notifications-icon">{newItemsNumber}</div>
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="LOG OUT" onClick={navigate}>
        <UserAvatarFilledAlt />
      </HeaderGlobalAction>
    </HeaderGlobalBar>
  </Header>
);

export default NotificationsHeader;
