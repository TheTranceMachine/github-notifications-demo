import { Row, Column, Button } from "@carbon/react";
import Image from "next/image";
import localFont from "next/font/local";
import cx from "classnames";
import MediaQuery from "@/app/hooks/useMedia";
import HomeFeatures from "./home-features";

const audiowide = localFont({
  src: "../../fonts/Audiowide/Audiowide-Regular.ttf",
});

const HomeHero = ({ theme }) => {
  const mobile = MediaQuery(`(max-width: 768px)`);
  const tablet = MediaQuery(`(min-width: 768px) and (max-width: 1024px)`);

  return (
    <Row className="home-hero" id="home">
      <Column lg={4} md={12}>
        <Row>
          <Column>
            <h1 className={cx({ glow: theme.isDark }, audiowide.className)}>Github Notifications</h1>
            <p className="home-hero__description">Get notifications for your Github repositories in real-time.</p>
            {mobile || tablet ? (
              <Button kind="primary" size="lg" href="/notifications" className="home-hero__button">
                Try Demo
              </Button>
            ) : null}
            <div className="divider--solid" />
            <HomeFeatures />
          </Column>
        </Row>
      </Column>
      <Column
        lg={12}
        md={12}
        style={{
          position: "relative",
          height: mobile ? "255px" : "510px",
          marginTop: mobile ? "20px" : "0",
          marginBottom: tablet ? "100px" : "0",
        }}
      >
        <Image
          src={theme.isDark ? "/images/screenshot-dark.png" : "/images/screenshot-light.png"}
          alt="Demo Screenshot"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            boxShadow: "0 20px 20px rgba(0, 0, 0, 0.5)",
          }}
          width="1436"
          height="836"
        />
      </Column>
    </Row>
  );
};

export default HomeHero;
