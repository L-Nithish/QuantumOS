import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MarketingLayout from "./components/layout/MarketingLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import { TourProvider } from "./components/ui/TourProvider";
import OnboardingTour from "./components/ui/OnboardingTour";
import WelcomeModal from "./components/ui/WelcomeModal";

const FeaturesPage = lazy(() => import("./pages/FeaturesPage/FeaturesPage"));
const PricingPage = lazy(() => import("./pages/PricingPage/PricingPage"));
const Overview = lazy(() => import("./pages/DashboardPage/views/Overview"));
const Issues = lazy(() => import("./pages/DashboardPage/views/Issues"));
const Projects = lazy(() => import("./pages/DashboardPage/views/Projects"));
const Tasks = lazy(() => import("./pages/DashboardPage/views/Tasks"));
const Analytics = lazy(() => import("./pages/DashboardPage/views/Analytics"));
const Team = lazy(() => import("./pages/DashboardPage/views/Team"));
const Settings = lazy(() => import("./pages/DashboardPage/views/Settings"));
const OSApp = lazy(() => import("./os/App"));

const ForgotPasswordPage = lazy(() => import("./pages/Auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/Auth/ResetPasswordPage"));
const VerifyEmailPage = lazy(() => import("./pages/Auth/VerifyEmailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage/ContactPage"));

const Notifications = lazy(() => import("./pages/DashboardPage/views/Notifications"));
const Billing = lazy(() => import("./pages/DashboardPage/views/Billing"));
const WorkspaceCreate = lazy(() => import("./pages/DashboardPage/views/WorkspaceCreate"));
const WorkspaceSettings = lazy(() => import("./pages/DashboardPage/views/WorkspaceSettings"));
const WorkspaceRoles = lazy(() => import("./pages/DashboardPage/views/WorkspaceRoles"));
const AdminUsers = lazy(() => import("./pages/DashboardPage/views/AdminUsers"));
const AuditLogs = lazy(() => import("./pages/DashboardPage/views/AuditLogs"));
const SystemAnalytics = lazy(() => import("./pages/DashboardPage/views/SystemAnalytics"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-5 h-5 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <TourProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <WelcomeModal />
          <OnboardingTour />
          <Routes>
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/os/*" element={<OSApp />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/dashboard/overview" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard/issues" element={<Issues />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/team" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
            
            <Route path="/dashboard/notifications" element={<Notifications />} />
            <Route path="/dashboard/billing" element={<Billing />} />
            <Route path="/dashboard/workspace/create" element={<WorkspaceCreate />} />
            <Route path="/dashboard/workspace/settings" element={<WorkspaceSettings />} />
            <Route path="/dashboard/workspace/roles" element={<WorkspaceRoles />} />
            <Route path="/dashboard/admin/users" element={<AdminUsers />} />
            <Route path="/dashboard/admin/audit-logs" element={<AuditLogs />} />
            <Route path="/dashboard/admin/analytics" element={<SystemAnalytics />} />
          </Route>

          {/* Legacy redirects */}
          <Route path="/dashboard/projects" element={<Navigate to="/projects" replace />} />
          <Route path="/dashboard/teams" element={<Navigate to="/team" replace />} />
          <Route path="/dashboard/analytics" element={<Navigate to="/analytics" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </TourProvider>
  );
}

export default App;
