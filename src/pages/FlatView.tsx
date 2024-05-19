import { useContext, useEffect } from "react";
import { Flat } from "../interface";
import { FlatContext } from "../App";
import { getAllFlats } from "../firebase/methods/Flats/flats";

const FlatView = () => {
  const { flatApp, setFlatApp } = useContext(FlatContext);

  const fetchFlat = async () => {
    const allFlats = await getAllFlats();
    const myFlat = allFlats.filter((flat) => flat.id === allFlats[0].id);
    setFlatApp(myFlat as Flat[]);
    return myFlat;
  };
  console.log(flatApp);
  useEffect(() => {
    fetchFlat();
  }, []);
  //   const navigate = useNavigate();
  return (
    <>
      <div className="w-full">
        <div className="w-[50%] m-auto mt-[5%] flex flex-col border-2 p-2 rounded-xl">
          <h2 className="text-xl ml-5 mb-5 mt-5 font-semibold">{flatApp[0].title}</h2>
          <img className="w-full" src={flatApp[0].image} alt="flat images" />
          <div className="p-4 flex flex-col justify-center items-start gap-4">
            <div className="text-lg flex-col">
              <p className="text-lg">
                Address: {flatApp[0].streetNumber} {flatApp[0].streetName}, {flatApp[0].city}
              </p>
              <p className="text-lg">Phone: {flatApp[0].phone}</p>
            </div>
            <div className="text-lg flex gap-10">
              <p>
                Area: {flatApp[0].areaSize} m<sup>2</sup>
              </p>
              <p>Year Built: {flatApp[0].yearBuilt}</p>
            </div>
            <p className="text-lg">Price: {flatApp[0].rentPrice}/month</p>
            <p className="text-lg">Description: {flatApp[0].description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlatView;
