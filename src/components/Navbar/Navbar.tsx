import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../App";
import { signOutUser } from "../../firebase/api/auth";
import websiteLogo from "../../assets/logo_Roberic_transparent.png";
import Button from "../Buttons/ButtonComponent";
import "../../App.css";

const Navbar = () => {
  const pages = [
    { pageName: "Home", path: "/" },
    // { pageName: "Dashboard", path: "/dashboard" },
    { pageName: "My Profile", path: "/my-profile" },
    { pageName: "My Flats", path: "/my-flats" },
    { pageName: "Add Flat", path: "/add-flat" },
    { pageName: "Favorites", path: "/favorites" },
  ];
  const { userDetails, setUserDetails } = useContext(UserDataContext);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOutUser();
    localStorage.removeItem("loggedUser");
    setRender(false);
    setUserDetails({});
    navigate("/login");
  };

  // useEffect(() => {
  //   if (!JSON.parse(localStorage.getItem("loggedUser") as string)) {
  //     setRender(false);
  //   } else {
  //     setRender(true);
  //   }
  // }, [render, userDetails]);

  // if (!render) {
  //   return null;
  // }

  return (
    <nav className="relative px-8 py- flex justify-between items-center bg-gray-200">
      <div className="w-[60px] h-[60px] ml-5">
        <img src={websiteLogo} className="" alt="logo" />
      </div>
      <div>
        {userDetails.email ? (
          <ul className="flex gap-10">
            {pages.map((page, index) => (
              <li key={index}>
                <NavLink to={page.path} className="text-base hover:text-gray-500">
                  {page.pageName}
                </NavLink>
              </li>
            ))}
            {userDetails.role === "admin" ? (
              <NavLink to={"/dashboard"}>
                <li>Dashboard</li>
              </NavLink>
            ) : null}
          </ul>
        ) : null}
      </div>
      {userDetails.email ? (
        <div className="flex justify-center items-center gap-3">
          <h1 className="text-lg font-semibold">Welcome, {userDetails.firstName}</h1>
          <Button text={"Log out"} backgroundColor={"bg-gray-200"} handleClick={handleLogout} />
        </div>
      ) : (
        <div className="flex gap-10 mr-5">
          <NavLink to="/login">Sign In</NavLink>
          <NavLink to="/register">Sign Up</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
