import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
const Home = lazy(() => import("../pages/Home"));
const Explore = lazy(() => import("../pages/Explore"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const CreatePrompt = lazy(() => import("../pages/CreatePrompt"));
const EditPrompt = lazy(() => import("../pages/EditPrompt"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const MainRoute = () => {
  return (
    <Suspense fallback={<div><Loading /></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/create" element={<CreatePrompt />} />
        <Route path="/dashboard/edit/:id" element={<EditPrompt />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Suspense>
  );
};
export default MainRoute;
