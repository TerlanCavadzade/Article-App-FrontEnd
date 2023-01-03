import { lazy, Suspense, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthContext from "./store/auth-context";
import Loader from "./components/UI/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ConfirmAcc = lazy(() => import("./components/Auth/ConfirmAcc"));
const PostArticlePage = lazy(() => import("./pages/PostArticlePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const ReviewerPage = lazy(() => import("./pages/ReviewerPage"));
const ReviewForm = lazy(() => import("./components/Review/ReviewForm"));
const ArticleReview = lazy(() => import("./components/Admin/ArticleReview"));




function App() {
  const ctx = useContext(AuthContext);
  const { isAdmin, isLoggedIn, isReviewer } = ctx;
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/auth" element={<AuthPage />} />
          {!isLoggedIn && (
            <Route path="/confirm/:id" element={<ConfirmAcc />} />
          )}
          {!isAdmin && isLoggedIn && (
            <Route path="/post" element={<PostArticlePage />} />
          )}
          {!isAdmin && isLoggedIn && (
            <Route path="/profile" element={<ProfilePage />} />
          )}
          {isAdmin && <Route path="/adminPanel" element={<AdminPanel />} />}
          {isAdmin && (
            <Route path="/adminPanel/:id" element={<ArticleReview />} />
          )}
          {isLoggedIn && isReviewer && (
            <Route path="/articles" element={<ReviewerPage />} />
          )}
          {isLoggedIn && isReviewer && (
            <Route path="/articles/:id" element={<ReviewForm />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
