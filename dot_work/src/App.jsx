import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Signup from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import Admin from "../pages/admin-dashboard/Admin";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<MainLayout />}>
        <Route index element={<Admin />} />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
