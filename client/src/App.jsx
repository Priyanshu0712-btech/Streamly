import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import FriendsPage from "./pages/FriendPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";

import useAuthUser from "./hooks/useAuthUser";
import { useThemeStore } from "./store/useThemeStore";

import { StreamChatProvider } from "./providers/StreamChatProvider";

const App = () => {
  const { authUser, isLoading } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="h-screen">
      <Toaster position="top-right" />

      {isAuthenticated ? (
        <StreamChatProvider>
          <Routes>
            <Route
              path="/"
              element={
                isOnboarded ? (
                  <Layout showSidebar>
                    <HomePage />
                  </Layout>
                ) : (
                  <Navigate to="/onboarding" replace />
                )
              }
            />

            <Route
              path="/onboarding"
              element={
                !isOnboarded ? <OnboardingPage /> : <Navigate to="/" replace />
              }
            />

            <Route
              path="/friends"
              element={
                isOnboarded ? (
                  <Layout showSidebar>
                    <FriendsPage />
                  </Layout>
                ) : (
                  <Navigate to="/onboarding" replace />
                )
              }
            />

            <Route
              path="/notifications"
              element={
                isOnboarded ? (
                  <Layout showSidebar>
                    <NotificationsPage />
                  </Layout>
                ) : (
                  <Navigate to="/onboarding" replace />
                )
              }
            />

            <Route
              path="/profile"
              element={
                isOnboarded ? (
                  <Layout showSidebar>
                    <ProfilePage />
                  </Layout>
                ) : (
                  <Navigate to="/onboarding" replace />
                )
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </StreamChatProvider>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
