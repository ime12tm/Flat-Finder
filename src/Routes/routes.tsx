import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { Homepage, Login, Register, AddFlat, Dashboard } from "../pages";
import EditFlat from "../pages/EditFlat";

function AppRoutes() {
  const routes = [
    { name: <Homepage />, path: "/" },
    { name: <Login />, path: "/login" },
    // { name: <ForgotPassword />, path: "/forgot-password" },
    { name: <Register />, path: "/register" },
    { name: <AddFlat />, path: "/add-flat" },
    { name: <EditFlat />, path: "/edit-flat" },
    { name: <Dashboard />, path: "/dashboard" },
    { name: <EditFlat />, path: "/edit/:id" },
  ];
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {routes.map(({ name, path }) => (
          <Route key={path} path={path} element={name} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
