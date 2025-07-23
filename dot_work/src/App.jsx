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
import PreviewQuestions from "../pages/preview-questions/PreviewQuestions";
import ViewSubmissions from "../pages/admin-dashboard/ViewSubmissions";
import TestReport from "../pages/admin-dashboard/TestReport";
import Users from "../pages/admin-dashboard/Users";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/preview" element={<PreviewQuestions />} />
        <Route path="/view-submissions" element={<ViewSubmissions />} />
        <Route path="/test-report/:id" element={<TestReport />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
