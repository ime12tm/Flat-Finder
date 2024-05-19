import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserDataContext, FlatContext } from "../App";
import { Flat } from "../interface";
import { getAllFlats, deleteFlat } from "../firebase/methods/Flats/flats";
import Button from "../components/Buttons/ButtonComponent";
import { NavLink } from "react-router-dom";

const MyFlats = () => {
  const { userDetails } = useContext(UserDataContext);
  const { flatApp, setFlatApp } = useContext(FlatContext);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const allFlats = await getAllFlats();
    const myFlats = allFlats.filter((flat) => flat.createdBy === userDetails.email);
    setFlatApp(myFlats as Flat[]);
    return myFlats;
  };
  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = async (id: string) => {
    //logica confirmare -> if yes
    await deleteFlat(id);
    await fetchProducts();
  };
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("loggedUser") as string)) {
      navigate("/login");
    }
    fetchProducts();
  }, []);

  return (
    <>
      <div className="container w-[1280px] mt-5 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto gap-4">
        {flatApp.map((flat: Flat) => (
          <div key={flat.id} className="flex justify-between items-center w-full gap-10">
            <div className="h-full rounded-lg bg-grey w-1/3 overflow-auto flex flex-col justify-start items-center gap-5 sm:w-2/3 md:w-full">
              <img src={flat.image} className="w-full cursor-pointer" />
              <div className="flex flex-col justify-start items-start">
                <p className="text-xl font-bold pb-5">{flat.title}</p>
                <div className="flex gap-2 pb-5">
                  <p>{flat.city} |</p>
                  <p>
                    Price: <span>{flat.rentPrice}$/month |</span>
                  </p>
                  <p>
                    Size:{" "}
                    <span>
                      {flat.areaSize} m<sup>2</sup>
                    </span>
                  </p>
                </div>
                <p className="pb-5">From {flat.dateAvailable}</p>
                <p className="pb-5">{flat.description}</p>
                <NavLink to={`/flat/${flat.id}`} className="font-bold text-lg pb-5">
                  See More...
                </NavLink>
                <div className="flex gap-4 justify-center items-end">
                  <>
                    <Button
                      text="Edit"
                      backgroundColor="bg-green-300 w-20"
                      handleClick={() => handleEdit(flat.id as string)}
                    />
                    <Button
                      text="Delete"
                      backgroundColor="bg-red-300 w-20"
                      handleClick={() => handleDelete(flat.id as string)}
                    />
                  </>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyFlats;
