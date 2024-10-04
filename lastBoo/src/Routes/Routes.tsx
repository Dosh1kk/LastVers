import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";

import LoginPage from "../Pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../Pages/RegistrPage/RegisterPage";
import FavoritePage from "../Pages/FavoritePage/FavoritePage";
import AdminPage from "../Pages/AdminPage/AdminPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        {path:"adminpanel", element:<AdminPage />},
        {
          path: "favorite",
          element: (
            <ProtectedRoute>
              <FavoritePage />
            </ProtectedRoute>
          ),
        },  
        {
          path: "search",
          element: (
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          ),
         },       
        
        

      ],
    },
  ]);