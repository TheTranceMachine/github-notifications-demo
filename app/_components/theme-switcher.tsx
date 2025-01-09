import { IconButton } from "@carbon/react";
import { Light, LightFilled } from "@carbon/react/icons";

const ThemeSwitcher = ({ switchTheme, theme }) => (
  <div
    style={{ position: "fixed", top: "98px", right: 0, zIndex: 10000 }}
    aria-label="theme-switcher"
    aria-describedby="theme-switcher"
    role="button"
    tabIndex={0}
  >
    <IconButton onClick={switchTheme} label="Theme" kind="secondary">
      {theme === "g100" ? <Light /> : <LightFilled />}
    </IconButton>
  </div>
);

export default ThemeSwitcher;
