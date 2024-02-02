import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Lists from "./screens/Lists";
import Study from "./screens/Study";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const BrowserRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "study",
        element: (
            <ProtectedRoute>
                <Study />
            </ProtectedRoute>
        ),
    },
    {
        path: "lists",
        element: (
            <ProtectedRoute>
                <Lists />
            </ProtectedRoute>
        ),
    },
]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={BrowserRouter} />
        </AuthProvider>
    );
}

export default App;
