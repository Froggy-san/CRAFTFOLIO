import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/shared/AppLayout";
import AuthLayout from "./components/shared/AuthLayout";
import LoginForm from "./features/authentication/LoginForm";
import SignUpForm from "./features/authentication/SignUpForm";

import UserPorfolio from "./pages/UserProfile";
import Home from "./pages/Home";
import UserSettings from "./pages/UserSettings";

import AuthContextProvidor from "./context/AuthContext";
import ProjectView from "./pages/ProjectView";
import EditPost from "./pages/EditPost";
import AddPost from "./pages/AddPost";
import "./globals.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/user/:userId", element: <UserPorfolio /> },
      // { path: "/uploads", element: <UploadPorfolio /> },
      { path: "/upload-post", element: <AddPost /> },
      { path: "/edit-post/:postId", element: <EditPost /> },
      { path: "/user-settings", element: <UserSettings /> },
      { path: "/project/:projectId", element: <ProjectView /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignUpForm /> },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <AuthContextProvidor>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />

        <Toaster
          position="bottom-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "7px 17px",
              // backgroundColor: "var(--color-grey-0)",
              // color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </AuthContextProvidor>
  );
}

export default App;
