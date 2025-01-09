import { Column, FlexGrid, Row } from "@carbon/react";
import cx from "classnames";
import localFont from "next/font/local";
import Link from "next/link";

const audiowide = localFont({
  src: "../../fonts/Audiowide/Audiowide-Regular.ttf",
});

const HomeFooter = ({ theme }) => (
  <div className={cx("home-footer", { dark: theme.isDark }, { light: !theme.isDark })}>
    <FlexGrid fullWidth>
      <Row>
        <Column lg={12}>
          <h2 className={cx("home-footer__header", audiowide.className)}>Github Notifications</h2>
        </Column>
      </Row>
      <Row>
        <Column lg={6} className="home-footer__column">
          <h4>Useful Links</h4>
          <ul className="home-footer__column__list">
            <li className="item">
              <Link
                aria-label="blog-link"
                href="https://thetrancemachine.github.io/blog/"
                target="_blank"
                rel="noopener noreferrer"
                className={cx("item__link", { dark: theme.isDark }, { light: !theme.isDark })}
              >
                Blog
              </Link>
            </li>
            <li className="item">
              <Link
                aria-label="github-project-link"
                href="https://github.com/TheTranceMachine/github-notifications-demo"
                target="_blank"
                rel="noopener noreferrer"
                className={cx("item__link", { dark: theme.isDark }, { light: !theme.isDark })}
              >
                Github
              </Link>
            </li>
            <li className="item">
              <Link
                aria-label="demo-link"
                href="/notifications"
                rel="noopener noreferrer"
                className={cx("item__link", { dark: theme.isDark }, { light: !theme.isDark })}
              >
                Demo
              </Link>
            </li>
          </ul>
        </Column>
        <Column lg={6} className="home-footer__column">
          <h4>Contact</h4>
          <ul className="home-footer__column__list">
            <li className="item">
              <Link
                aria-label="email-link"
                href="mailto:grzegorz.smolin2@gmail.com"
                rel="noopener noreferrer"
                className={cx("item__link", { dark: theme.isDark }, { light: !theme.isDark })}
              >
                Email
              </Link>
            </li>
            <li className="item">
              <Link
                aria-label="github-link"
                href="https://github.com/TheTranceMachine"
                target="_blank"
                rel="noopener noreferrer"
                className={cx("item__link", { dark: theme.isDark }, { light: !theme.isDark })}
              >
                Github
              </Link>
            </li>
            <li className="item">
              <Link
                aria-label="linkedin-link"
                href="https://www.linkedin.com/in/gregorysmolin/"
                rel="noopener noreferrer"
                target="_blank"
                className={cx("item__link", { dark: theme.isDark }, { light: !theme.isDark })}
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </Column>
      </Row>
    </FlexGrid>
  </div>
);

export default HomeFooter;
