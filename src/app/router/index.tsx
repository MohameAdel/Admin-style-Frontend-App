import { createHashRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { ProductsPage } from "@/features/products/pages/ProductsPage";

export const router = createHashRouter([
    {
        path: "/",
        element: <Navigate to="/app/products" replace />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/app",
        element: <ProtectedRoute />,
        children: [
            {
                path: "products",
                element: <ProductsPage />,
            },
        ],
    },
]);
