import {
  FinancesIcon,
  LogoutIcon,
  MenuOpen,
  OverviewIcon,
  PropertiesIcon,
  SettingsIcon,
  placeholderAvatar,
} from "assets";
import { LogoWithText, useOutsideAlerter } from "components";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "router";
import styles from "./styles.module.css";
import { Logout } from "./logoutPrompt";

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
  | "Finance"
  | "Team"
  | "Settings";

export interface LayoutProps {
  active: dashboardPages;
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ active, children }) => {
  const SidebarItems: SidebarType[] = [
    {
      active,
      state: "Overview",
      url: Routes.overview,
      type: "link",
      Icon: OverviewIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Users",
      url: Routes.users,
      type: "link",
      Icon: PropertiesIcon,
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
      Icon: SettingsIcon,
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

  const [showMenu, setShowMenu] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);

  const menuRef = React.useRef(null);

  const onHide = () => {
    setShowMenu(false);
  };
  useOutsideAlerter(menuRef, onHide);

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
            <img src={placeholderAvatar} alt="avatar" />
            <p>Welcome Back Admin</p>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </>
  );
};

export { Layout };
export * from "./logoutPrompt";
