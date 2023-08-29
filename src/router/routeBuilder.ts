import {
  Login,
  Error404,
  ForgotPassword,
  ResetPassword,
  Overview,
  Users,
} from "pages";
import { LayoutRouteProps } from "react-router-dom";
import { Routes } from "./routes";
import { Layout } from "layout";

// Route Builder Item Props
export interface RouteBuilderItem extends LayoutRouteProps {
  Layout?: React.FC<any>; // If you wish to add a layout to the page
  Element: React.FC;
  props?: any;
  isProtected?: boolean;
}

/**
 * ROUTE BUILDER
 *
 * ===============================================
 *
 * This is a list of all our application routes.
 *
 * A single item on this list contains the necessary Route props needed by React Router to do it's job.
 *
 * If you wish to add a new route to the application,
 * just fulfill all the necessary props needed by the RouteBuilder item. Ciao!
 *
 */
export const RouteBuilder: RouteBuilderItem[] = [
  {
    path: Routes.home,
    Element: Login,
  },
  {
    path: Routes.forgotPassword,
    Element: ForgotPassword,
  },
  {
    path: Routes.resetPassword,
    Element: ResetPassword,
  },
  {
    path: Routes.overview,
    Element: Overview,
    Layout: Layout,
    props: {
      active: "Overview",
    },
  },
  {
    path: Routes.users,
    Element: Users,
    Layout: Layout,
    props: {
      active: "Users",
    },
  },
  {
    path: "*",
    Element: Error404,
  },
];
