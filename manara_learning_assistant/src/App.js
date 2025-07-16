import React, { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";

// Auth and Config Imports
import { getTheme } from "./config/theme";
import {
  ThemeModeContext,
  ThemeModeProvider,
} from "./contexts/ThemeModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Import the new guard
import "./config/i18n";

// Layout and Page Imports
import Layout from "./components/layout/Layout";
import LandingPage from "./components/pages/landing-page/LandingPage";
import SignInPage from "./components/pages/auth/SignInPage";
import SignUpPage from "./components/pages/auth/SignUpPage";
import RecoverPasswordPage from "./components/pages/auth/RecoverPasswordPage";
import SubscriptionPage from "./components/pages/subscription/SubscriptionPage";
import Home from "./components/pages/home/Home";
import ExamsPage from "./components/pages/exams/ExamsPage";
import ProblemDetailPage from "./components/pages/problems/ProblemDetailPage";
import CoursesPage from "./components/pages/courses/CoursesPage";
import CourseDetailPage from "./components/pages/courses/CourseDetailPage";
import ChapterPracticePage from "./components/pages/courses/ChapterPracticePage";
import ProjectsPage from "./components/pages/projects/ProjectsPage";
import RatingPage from "./components/pages/rating/RatingPage";
import ProfessorDetailPage from "./components/pages/rating/ProfessorDetailPage";
import SettingsPage from "./components/pages/settings/SettingsPage";
import LegalPage from "./components/pages/legal/LegalPage";
import AddExamPage from "./components/pages/add-exam/AddExamPage";
import AddProjectPage from "./components/pages/add-project/AddProjectPage";
import AddPostPage from "./components/pages/add-post/AddPostPage";
import AddCoursePage from "./components/pages/courses/AddCoursePage";

// A wrapper to apply the main layout to all nested routes
const AppLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const AppContent = () => {
  const { mode } = useContext(ThemeModeContext);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/recover" element={<RecoverPasswordPage />} />
        <Route path="/terms" element={<LegalPage />} />

        {/* Protected Routes - All routes within here require login */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {/* Basic User Routes (also accessible by Pro and Admin) */}
            <Route path="/home" element={<Home />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/exams/:examId" element={<ProblemDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/legal" element={<LegalPage />} />

            {/* Pro User Routes (also accessible by Admin) */}
            <Route element={<ProtectedRoute proRequired />}>
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:courseId" element={<CourseDetailPage />} />
              <Route
                path="/courses/:courseId/chapters/:chapterId"
                element={<ChapterPracticePage />}
              />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/rating" element={<RatingPage />} />
              <Route
                path="/professors/:professorId"
                element={<ProfessorDetailPage />}
              />
            </Route>

            {/* Admin Only Routes */}
            <Route element={<ProtectedRoute adminRequired />}>
              <Route path="/add-exam" element={<AddExamPage />} />
              <Route path="/add-project" element={<AddProjectPage />} />
              <Route path="/add-post" element={<AddPostPage />} />
              <Route path="/add-course" element={<AddCoursePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

const App = () => (
  <AuthProvider>
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  </AuthProvider>
);

export default App;
