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
import CreateTest from "../pages/admin-dashboard/CreateTest";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/create-test" element={<CreateTest />} />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
