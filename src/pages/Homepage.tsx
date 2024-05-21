import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FlatContext, UserDataContext } from "../App";
import { getAllFlats } from "../firebase/methods/Flats/flats";
import FlatRender from "../components/FlatRender/FlatRender";
import { Flat } from "../interface";
// import SpinnerLoader from "../components/SpinnerLoader/SpinnerLoader";

const Home = () => {
  const { flatApp, setFlatApp } = useContext(FlatContext);
  const { userDetails } = useContext(UserDataContext);
  const navigate = useNavigate();

  const fetchFlats = async () => {
    const allProducts = await getAllFlats();
    setFlatApp(allProducts as Flat[]);
    return allProducts;
  };

  const buttonConfig = {
    text: "Add to cart",
    backgroundColor: "bg-gray-200",
    handleClick: fetchFlats,
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("loggedUser") as string)) {
      navigate("/login");
    }
    fetchFlats();
  }, []);

  return (
    <>
      <FlatRender flats={flatApp} buttonConfig={buttonConfig} />
    </>
  );
};

export default Home;
