import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useRoutes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action/auth";

// CUSTOMR ROUTES
import Protected from "./components/Route/ProtectedRoute";
import Public from "./components/Route/PublicRoute";

// PAGES
import Login from "./pages/Login";
import Executive from "./pages/Executive";
import Admin from "./pages/Admin";
import ICT from "./pages/ICT";
import Logistic from "./pages/Logistic";
import Employee from "./pages/Employee";
import Supplies from "./pages/Supplies";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Public>
              <Login />
            </Public>
          }
        />
        <Route
          path="/"
          element={
            <Protected>
              {user?.role === "Admin" && <Admin />}
              {user?.role === "Executive" && <Supplies />}
              {user?.role === "Logistic" && <Logistic />}
              {user?.role === "ICT" && <ICT />}
              {user?.role === "Employee" && <Employee />}
            </Protected>
          }
        />
        <Route
          path="/supplies"
          element={<Protected>{user && <Supplies />}</Protected>}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
