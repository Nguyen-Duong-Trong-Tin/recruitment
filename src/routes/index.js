import PrivateRoutes from "../components/PrivateRoutes";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutDefault from "../layouts/LayoutDefault";
import CompanyDetail from "../pages/CompanyDetail";
import CompanyInfo from "../pages/CompanyInfo";
import Dashboard from "../pages/Dashboard";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ManageCVs from "../pages/ManageCVs";
import CVDetail from "../pages/ManageCVs/CVDetail";
import CVsTable from "../pages/ManageCVs/CVsTable";
import ManageJobs from "../pages/ManageJobs";
import CreateJob from "../pages/ManageJobs/CreateJob";
import JobsTable from "../pages/ManageJobs/JobsTable";
import Register from "../pages/Register";
import ResultSearch from "../pages/ResultSearch";
import JobDetail from "../pages/ResultSearch/JobDetail";
import JobsList from "../pages/ResultSearch/JobsList";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "resultSearch",
        element: <ResultSearch />,
        children: [
          {
            index: true,
            element: <JobsList />
          },
          {
            path: ":id",
            element: <JobDetail />
          }
        ]
      },
      {
        path: "companyDetail/:id",
        element: <CompanyDetail />
      },
      {
        path: "*",
        element: <Error404 />
      }
    ]
  },
  //Private
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: "companyInfo",
            element: <CompanyInfo />
          },
          {
            path: "manageJobs",
            element: <ManageJobs />,
            children: [
              {
                index: true,
                element: <JobsTable />
              },
              {
                path: "createJob",
                element: <CreateJob />
              }
            ]
          },
          {
            path: "manageCVs",
            element: <ManageCVs />,
            children: [
              {
                index: true,
                element: <CVsTable />
              },
              {
                path: "CVDetail/:id",
                element: <CVDetail />
              }
            ]
          },

        ]
      }
    ]
  }
]