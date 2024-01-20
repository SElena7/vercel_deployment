import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import LeftBar from "./components/leftBar/leftBar.jsx";
import RightBar from "./components/rightBar/rightBar.jsx";
import Home from "./pages/home/home.jsx";
import Profile from "./pages/profile/profile.jsx";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/DarkModeContext.js";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const { currentUser } = useContext(AuthContext);

    const { darkMode } = useContext(DarkModeContext);

    const queryClient = new QueryClient();

    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <div className={`theme-${darkMode ? "dark" : "light"}`}>
                    <Navbar />
                    <div style={{ display: "flex" }}>
                        <LeftBar />
                        <div style={{ flex: 6 }}>
                            <Outlet />
                        </div>
                        <RightBar />
                    </div>
                </div>
            </QueryClientProvider>
        );
    };

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/profile/:id",
                    element: <Profile />,
                },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;