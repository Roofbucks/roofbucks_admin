import {
  BellIconOutline,
  FinancesIcon,
  LogoutIcon,
  MenuOpen,
  OverviewIcon,
  PropertiesIcon,
  SettingsIcon,
  TeamIcon,
  UsersIcon,
  placeholderAvatar,
} from "assets";
import { LogoWithText, useOutsideAlerter } from "components";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "router";
import styles from "./styles.module.css";
import { Logout } from "./logoutPrompt";
import { useAppSelector } from "state/hooks";
import { Notifications } from "./notifications";
import { fetchNotifsService } from "api";
import { useApiRequest } from "hooks";

interface SidebarType {
  active: dashboardPages;
  state: dashboardPages | "Logout" | "Support";
  url?: string;
  type: "link" | "button";
  action?: () => void;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const SidebarItem: React.FC<SidebarType> = ({
  active,
  state,
  type,
  url = Routes.overview,
  action,
  Icon,
}) => {
  return (
    <li
      className={`${styles.sidebarItem} ${
        active === state ? styles.activeItem : ""
      }`}
    >
      {type === "link" ? (
        <Link onClick={action} className={styles.sidebarType} to={url}>
          <Icon className={styles.sidebarIcon} />
          <span className={styles.sidebarText}>{state}</span>
        </Link>
      ) : (
        <button className={styles.sidebarType} onClick={action}>
          <Icon className={styles.sidebarIcon} />
          <span className={styles.sidebarText}>{state}</span>
        </button>
      )}
    </li>
  );
};

type dashboardPages =
  | "Overview"
  | "Users"
  | "Properties"
  | "Listings"
  | "Marketplace"
  | "Finance"
  | "Team"
  | "Settings";

export interface LayoutProps {
  active: dashboardPages;
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ active, children }) => {
  const { firstName, role } = useAppSelector((state) => state.user);
  const allSidebarItems: SidebarType[] = [
    // {
    //   active,
    //   state: "Overview",
    //   url: Routes.overview,
    //   type: "link",
    //   Icon: OverviewIcon,
    //   action: () => setShowMenu(false),
    // },
    {
      active,
      state: "Users",
      url: Routes.users,
      type: "link",
      Icon: UsersIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Properties",
      url: Routes.properties,
      type: "link",
      Icon: PropertiesIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Listings",
      url: Routes.listings,
      type: "link",
      Icon: PropertiesIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Marketplace",
      url: Routes.marketplace,
      type: "link",
      Icon: PropertiesIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Finance",
      url: Routes.finance,
      type: "link",
      Icon: FinancesIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Team",
      url: Routes.team,
      type: "link",
      Icon: TeamIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Settings",
      url: Routes.settings,
      type: "link",
      Icon: SettingsIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Logout",
      type: "button",
      action: () => setShowLogout(true),
      Icon: LogoutIcon,
    },
  ];

  const SidebarItems: SidebarType[] = allSidebarItems.filter((item) =>
    role === "member"
      ? item.state !== "Finance" && item.state !== "Team"
      : item.state
  );

  const [showMenu, setShowMenu] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = React.useState(false);

  const [unreadNotif, setUnreadNotif] = React.useState(0);
  const menuRef = React.useRef(null);

  const onHide = () => {
    setShowMenu(false);
  };
  useOutsideAlerter(menuRef, onHide);

  const { run: runFetch, data: fetchResponse } = useApiRequest({});

  const fetchNotifs = () => runFetch(fetchNotifsService(1));

  React.useEffect(() => {
    fetchNotifs();
  }, [active]);

  React.useMemo(() => {
    if (fetchResponse?.status === 200) {
      setUnreadNotif(fetchResponse.data.results.unread_count);
    }
  }, [fetchResponse]);

  return (
    <>
      <Logout show={showLogout} closeModal={() => setShowLogout(false)} />
      <main className={styles.main}>
        <nav className={`${styles.sideBar} ${showMenu ? styles.overLay : ""}`}>
          <div className={styles.mobileNav}>
            <LogoWithText className={styles.logo} type={"light"} />
            <MenuOpen
              role="button"
              onClick={() => setShowMenu(!showMenu)}
              className={styles.menuBtn}
            />
          </div>
          <ul ref={menuRef} className={styles.sidebarList}>
            {SidebarItems.map((item, index) => (
              <SidebarItem {...item} key={index} />
            ))}
          </ul>
        </nav>
        <header className={styles.navBar}>
          <div className={styles.profileSec}>
            {/* <img src={placeholderAvatar} alt="avatar" /> */}
            <p>
              Hello, {firstName} <span>{role}</span>
            </p>
          </div>
          <div
            className={`${styles.notifWrap} ${styles.notifRed} ${
              showNotifDropdown ? styles.disableCaret : ""
            } ${unreadNotif > 0 ? styles.unread : ""}`}
          >
            <BellIconOutline
              role="button"
              className={styles.notif}
              onClick={() => setShowNotifDropdown(true)}
            />
            <Notifications
              show={showNotifDropdown}
              closeMenu={(x) => setShowNotifDropdown(x)}
              className={styles.notifDropdownWrap}
            />
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </>
  );
};

export { Layout };
export * from "./logoutPrompt";
