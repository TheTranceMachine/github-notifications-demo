import { Row, Column } from "@carbon/react";
import { Flag, NotificationOff, Renew, Rocket } from "@carbon/react/icons";

const HomeFeatures = () => (
  <div className="home-features">
    <div className="home-features__item">
      <div className="header">
        <div className="icon">
          <Rocket />
        </div>
        <div className="title">Fast Performance</div>
      </div>
      <p>Github read and write with octokit library in real-time.</p>
    </div>
    <div className="home-features__item">
      <div className="header">
        <div className="icon">
          <Renew />
        </div>
        <div className="title">Refresh Notifications</div>
      </div>
      <p>
        Automaticaly finds new notifications and collects them in one place. Refresh the view when you need. You can
        also get new notifications manually.
      </p>
    </div>
    <div className="home-features__item">
      <div className="header">
        <div className="icon">
          <Flag />
        </div>
        <div className="title">Flag as Read</div>
      </div>
      <p>Mark notifications as read to keep track of what you have already seen.</p>
    </div>
    <div className="home-features__item">
      <div className="header">
        <div className="icon">
          <NotificationOff />
        </div>
        <div className="title">Mute Notifications</div>
      </div>
      <p>Hide notifications you don't want to see.</p>
    </div>
  </div>
);

export default HomeFeatures;
