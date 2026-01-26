import { AuthLayout } from "@/layout";
import { DashboardLayout } from "@/layout/dashboard-layout";
import { PublicLayout } from "@/layout/public-layout";
import {
  AddRecruitmentNoticePage,
  AgencyPage,
  AppliedRecruitmentNoticePage,
  CompanyPage,
  DashboardPage,
  EditRecruitmentNoticePage,
  EmploymentPage,
  HomePage,
  LoginPage,
  MyApplicantsPage,
  MyInformationPage,
  NotFoundPage,
  RecruitmentNoticePage,
  RegisterAgencyPage,
  RegisterCompany,
  RegisterWorkerPage,
  SelectRolePage,
  SettingsPage,
  WorkerPage,
  WorkerRecruitmentNoticePage,
} from "@/pages";
import { AddWorkerPage } from "@/pages/add-worker";
import { RegisterKoreanAgencyPage } from "@/pages/korean-agency/korean-agency";
import { RecruitmentNoticeDetailsPage } from "@/pages/recruitment-notice-details/recruitment-notice-details";
import { WorkerRecruitmentNoticeManagementPage } from "@/pages/worker-recruitment-notice-management";
import { WorkersPage } from "@/pages/workers";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";

export const AppRoutes = () => {
  const location = useLocation();
  return (
    <RouterRoutes location={location} key={location.pathname}>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/role" element={<SelectRolePage />} />
        <Route path="/register-company" element={<RegisterCompany />} />
        <Route path="/register-agency" element={<RegisterAgencyPage />} />
        <Route path="/register-worker" element={<RegisterWorkerPage />} />
        <Route
          path="/register-korean-agency"
          element={<RegisterKoreanAgencyPage />}
        />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/employment" element={<EmploymentPage />} />
        <Route path="/my-applications" element={<MyApplicantsPage />} />
        <Route path="/my-information" element={<MyInformationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/workers" element={<WorkersPage />} />
        <Route path="/worker/:id" element={<WorkerPage />} />
        <Route path="/agency/:id" element={<AgencyPage />} />
        <Route path="/company/:id" element={<CompanyPage />} />
        <Route path="/recruitment-notice" element={<RecruitmentNoticePage />} />
        <Route
          path="/worker-recruitment-notice"
          element={<WorkerRecruitmentNoticePage />}
        />
        <Route
          path="/recruitment-notice/:id"
          element={<RecruitmentNoticeDetailsPage />}
        />
        <Route path="/add-worker" element={<AddWorkerPage />} />
        <Route
          path="/add-recruitment-notice"
          element={<AddRecruitmentNoticePage />}
        />
        <Route
          path="/edit-recruitment-notice/:id"
          element={<EditRecruitmentNoticePage />}
        />
        <Route
          path="/applied-recruitment-notice"
          element={<AppliedRecruitmentNoticePage />}
        />
        <Route
          path="/recruitment-notice-management/:id"
          element={<WorkerRecruitmentNoticeManagementPage />}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
};
