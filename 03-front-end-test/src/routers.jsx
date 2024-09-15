import { createBrowserRouter, Link } from "react-router-dom";
import App from "./App.jsx";

/* Components */
import ThisWeek from "./components/This-Week.jsx";
import NextWeek from "./components/Next-Week.jsx";
import WholeMonth from "./components/Whole-Month.jsx";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "thisweek",
        element: <ThisWeek />,
      },
      {
        path: "nextweek",
        element: <NextWeek />,
      },
      {
        path: "wholeMonth",
        element: <WholeMonth/>,
      }
    ],
  },
  {
    path: "*",
    element: (
      <div className="text-center h-100">
        <p>There's nothing here: 404!</p>
        <Link to="/thisweek?roomId=A101" className="btn btn-primary">
          Go to home page
        </Link>
      </div>
    ),
  },
]);
