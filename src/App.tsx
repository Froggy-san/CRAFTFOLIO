import "./globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/shared/AppLayout";

import LoginForm from "./features/authentication/LoginForm";
import SignUpForm from "./features/authentication/SignUpForm";

import UserPorfolio from "./pages/UserProfile";
import Home from "./pages/Home";
import UserSettings from "./pages/UserSettings";

import AuthContextProvidor from "./context/AuthContext";
import ProjectView from "./pages/ProjectView";
import EditPost from "./pages/EditPost";
import AddPost from "./pages/AddPost";
import { ThemeProvider } from "./context/ThemeProvidor";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import AuthLayout from "./features/authentication/AuthLayout";
import ForgetPassword from "./features/authentication/ForgetPassword";
import ResetPassword from "./features/authentication/ResetPassword";
import DashBoard from "./pages/DashBoard";
import Error from "./components/shared/Error";
import { useEffect } from "react";
import supabase from "./services/supabase";
import { deleteUser, getCurrentUser, getUserById } from "./services/authApi";
import { createAboutMe } from "./services/aboutMeApi";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "user/:userId",
        element: <UserPorfolio />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/upload-post", element: <AddPost /> },
          { path: "/edit-post/:postId", element: <EditPost /> },
          { path: "/user-settings", element: <UserSettings /> },
          { path: "/dashboard", element: <DashBoard /> },
        ],
      },
      { path: "/project/:projectId", element: <ProjectView /> },
    ],
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    errorElement: <Error />,
  },
  {
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignUpForm /> },
      { path: "/frogot-password", element: <ForgetPassword /> },
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
  useEffect(() => {
    const checkIfUserExists = async () => {
      const { data } = await supabase.auth.getSession();
      const user = await getUserById(data.session?.user.id || "");

      if (!user.length) {
        const { error: publicUserError } = await supabase
          .from("publicUsers")
          .insert([
            {
              email: data.session?.user.email,
              phone: "",
              speciality: "",
              username: data.session?.user.user_metadata.name,
              avatar: data.session?.user.user_metadata.avatar_url,
              userId: data.session?.user?.id,
              resumeUrl: "",
            },
          ])
          .select();

        // if (publicUserError) throw new Error(publicUserError.message);

        const DEFAULT_ABOUT_ME_COLOR = { r: 110, g: 64, b: 191, a: 1 };

        const aboutError = await createAboutMe({
          links: "",
          aboutMe: "",
          toolsAndTech: "",
          arrowType: "",
          arrowColor: JSON.stringify(DEFAULT_ABOUT_ME_COLOR),
          user_id: data.session?.user?.id,
        });
        if (aboutError) {
          await deleteUser(data.session?.user?.id || ""); // deleting the user from the users table.

          // throw new Error(aboutError.message);
        }
      }
    };
    checkIfUserExists();
  }, []);
  return (
    <AuthContextProvidor>
      <ThemeProvider defaultTheme="light">
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
                backgroundColor: "hsl(var(--primary-foreground))",
                color: "hsl(var(--foreground))",
              },
            }}
          />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthContextProvidor>
  );
}

export default App;
