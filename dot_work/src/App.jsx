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
import Settings from "../pages/admin-dashboard/Settings";
import OTP from "../pages/auth/Otp";
import ThankYou from "../pages/auth/ThankYou";
import Tests from "../pages/admin-dashboard/Tests";
import AddCandidatesForm from "../pages/admin-dashboard/AddCandidatesForm";
import TestDetails from "../pages/admin-dashboard/TestDetails";
import MyTests from "../pages/admin-dashboard/MyTests";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/slices/authSlice";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AttemptTest from "../pages/test/AttemptTest";
import ProctoringConsent from "../pages/test/ProctoringConsent";
import TestProctoringDebug from "../pages/TestProctoringDebug";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-otp" element={<OTP />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Admin />} />
          <Route path="/create-test" element={<CreateTest />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/my-tests" element={<MyTests />} />
          <Route path="/test/details/:testId" element={<TestDetails />} />
          <Route
            path="/test/add-candidates/:testId"
            element={<AddCandidatesForm />}
          />
          <Route path="/test/:slug" element={<AttemptTest />} />
          <Route path="/consent/:slug" element={<ProctoringConsent />} />
          <Route path="/test-debug/:slug" element={<TestProctoringDebug />} />
          <Route path="/preview" element={<PreviewQuestions />} />
          <Route path="/view-submissions" element={<ViewSubmissions />} />
          <Route path="/test-report/:id" element={<TestReport />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
