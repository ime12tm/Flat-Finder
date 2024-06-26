import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Homepage, Login, Register, AddFlat, Dashboard, MyProfile, MyFlats, ForgotPassword } from "../pages";
import EditFlat from "../pages/EditFlat";
import FlatView from "../pages/FlatView";

function AppRoutes() {
  const routes = [
    { name: <Homepage />, path: "/" },
    { name: <Login />, path: "/login" },
    { name: <ForgotPassword />, path: "/forgot-password" },
    { name: <Register />, path: "/register" },
    { name: <AddFlat />, path: "/add-flat" },
    { name: <EditFlat />, path: "/edit-flat" },
    { name: <Dashboard />, path: "/dashboard" },
    { name: <EditFlat />, path: "/edit/:id" },
    { name: <MyProfile />, path: "/my-profile" },
    { name: <MyFlats />, path: "/my-flats" },
    { name: <FlatView />, path: "/flat/:id" },
  ];
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {routes.map(({ name, path }) => (
          <Route key={path} path={path} element={name} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
