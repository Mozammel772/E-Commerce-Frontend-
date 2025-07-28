import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../Authentication/ForgotPassword";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import ErrorPage from "../ErrorPage/ErrorPage";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import UserLayout from "../layout/UserLayout";
import AdminQuotes from "../Pages/AdminDashboardPages/AdminQuotes/AdminQuotes";
import AllUsers from "../Pages/AdminDashboardPages/AllUsers/AllUsers";
import AdminOnSiteVisits from "../Pages/AdminDashboardPages/OnSiteVisits/OnSiteVisits";
import PendingEditPost from "../Pages/AdminDashboardPages/PendingPostPages/PendingEditPost";
import PendingPost from "../Pages/AdminDashboardPages/PendingPostPages/PendingPost";
import PendingPostDetails from "../Pages/AdminDashboardPages/PendingPostPages/PendingPostDetails";
import Contact from "../Pages/FooterPages/Contact";
import PrivacyPolicy from "../Pages/FooterPages/PrivacyPolicy";
import RefundPolicy from "../Pages/FooterPages/RefundPolicy";
import TermsAndConditions from "../Pages/FooterPages/TermsAndConditions";
import Home from "../Pages/HomePages/Home";
import TopProductsDetails from "../Pages/HomePages/TopProductsDetails";
import Profilio from "../Pages/ProfilioPages/Profilio";
import ProfilioDetails from "../Pages/ProfilioPages/ProfilioDetails";
import DashboardRedirect from "../Pages/UserDashboardPages/DashboardRedirect";
import EditMyPostHistory from "../Pages/UserDashboardPages/EditMyPostHistory";
import MyPostHistory from "../Pages/UserDashboardPages/MyPostHistory";
import MyPostHistoryDetails from "../Pages/UserDashboardPages/MyPostHistoryDetails";
import OnSiteVisit from "../Pages/UserDashboardPages/OnSiteVisit";
import Profile from "../Pages/UserDashboardPages/Profile";
import UserDashboard from "../Pages/UserDashboardPages/UserDashboard";
import Quote from "../Pages/UserQuotePages/Quote";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRouter";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <TopProductsDetails />,
      },
      {
        path: "/portfolio",
        element: <Profilio />,
      },
      {
        path: "/portfolio-details/:id",
        element: <ProfilioDetails />,
      },

      // Authentication
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },

      // footer
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy />,
      },
    ],
  },
  // Admin Dashboard
  {
    path: "admin-dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PendingPost />,
      },

      {
        path: "/admin-dashboard/post-management/pending-all-post-details/:id",
        element: <PendingPostDetails />,
      },
      {
        path: "/admin-dashboard/post-management/pending-all-post-edit/:id",
        element: <PendingEditPost />,
      },
      {
        path: "manage-users/all-users",
        element: <AllUsers />,
      },
      {
        path: "request-a-quote",
        element: <AdminQuotes />,
      },
      {
        path: "on-site-visits",
        element: <AdminOnSiteVisits />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  // User Dashboard
  {
    path: "user-dashboard",
    element: (
      <PrivateRoute>
        <UserRoute>
          <UserLayout />
        </UserRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },

      {
        path: "my-post-history",
        element: <MyPostHistory />,
      },
      {
        path: "my-post-history-details/:id",
        element: <MyPostHistoryDetails />,
      },
      {
        path: "my-post-history-details/edit/:id",
        element: <EditMyPostHistory />,
      },
      {
        path: "create-a-quote-requsted",
        element: <Quote />,
      },
      {
        path: "my-post-history-details/on/site/visit/:id",
        element: <OnSiteVisit />,
      },
      {
        path: "my-post-history-details/edit/:id",
        element: <Profile />,
      },

      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardRedirect />
      </PrivateRoute>
    ),
  },
]);
