import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserDataContext, FlatContext } from "../../App";
import { Flat, FlatTableProps } from "../../interface";
import { getAllFlats } from "../../firebase/methods/Flats/flats";
import { NavLink } from "react-router-dom";
import Button from "../Buttons/ButtonComponent";
// import { deleteFlat } from "../../firebase/methods/Flats/flats";

const FlatRender = ({ flats }: FlatTableProps) => {
  const { userDetails } = useContext(UserDataContext);
  const { flatApp, setFlatApp } = useContext(FlatContext);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const allFlats = await getAllFlats();
    setFlatApp(allFlats as Flat[]);
    return allFlats;
  };

  // const handleEdit = (id: string) => {
  //   navigate(`/edit/${id}`);
  // };
  // const handleDelete = async (id: string) => {
  //   //logica confirmare -> if yes
  //   await deleteFlat(id);
  //   await fetchProducts();
  // };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("loggedUser") as string)) {
      navigate("/login");
    } else if (userDetails.role !== "admin") {
      navigate("/");
    }
    fetchProducts();
  }, []);

  return (
    <>
      <div className="container w-[1280px] mt-5 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto gap-4">
        {flats.map((flat: Flat) => (
          <div key={flat.id} className="flex justify-between items-center w-full gap-10">
            <div className="h-full rounded-lg bg-grey w-1/3 overflow-auto flex flex-col justify-start items-center gap-5 sm:w-2/3 md:w-full">
              <img src={flat.image} className="w-full" />
              <div className="flex flex-col justify-start items-start">
                <p className="text-xl font-bold pb-5">{flat.title}</p>
                <div className="flex gap-2 pb-5">
                  <p>{flat.city} |</p>
                  <p>
                    Price: <span>{flat.rentPrice}$/mo |</span>
                  </p>
                  <p>
                    Size:{" "}
                    <span>
                      {flat.areaSize} m<sup>2</sup>
                    </span>
                  </p>
                </div>
                <p className="pb-5">Available from: {flat.dateAvailable}</p>
                <p className="pb-5">{flat.description}</p>
                <NavLink to={`/flat/${flat.id}`} className="font-bold text-lg">
                  See More...
                </NavLink>
                <Button text="Add To Favorite" backgroundColor="bg-orange-300" handleClick={() => handleFav()} />
                {/* {userDetails.role === "admin" ? (
                    <>
                      <Button
                        text="Edit"
                        backgroundColor="bg-green-300"
                        handleClick={() => handleEdit(flat.id as string)}
                      />
                      <Button
                        text="Delete"
                        backgroundColor="bg-red-300"
                        handleClick={() => handleDelete(flat.id as string)}
                      />
                    </>
                  ) : null} */}
                {/* {(() => {
                    if (userDetails.role === "admin") {
                      return (
                        <>
                          <Button text="Edit" backgroundColor="bg-green-300" handleClick={() => handleEdit()} />
                          <Button text="Delete" backgroundColor="bg-red-300" handleClick={() => handleDelete()} />
                        </>
                      );
                    }
                  })()} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlatRender;
