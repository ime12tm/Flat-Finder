import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getFlat, updateFlat } from "../firebase/methods/Flats/flats";
import Button from "../components/Buttons/ButtonComponent";
import { Flat } from "../interface";

const EditFlat = () => {
  const [flat, setFlat] = useState({} as Flat);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleProduct = async () => {
    console.log(id);
    setFlat((await getFlat(id as string)) as Flat);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFlat({ ...flat, [name]: value });
  };

  const handleSubmit = async () => {
    await updateFlat(flat);
    navigate("/");
  };

  useEffect(() => {
    handleProduct();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[50%] m-auto mt-[5%] flex flex-col border-2 p-2 rounded-xl">
        <h2 className="text-xl ml-5 mb-5 mt-5 font-semibold">Edit Flat: {flat.title}</h2>
        <div className="p-4 flex flex-col justify-center items-center gap-4">
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="id"
            name="id"
            className="w-full border-2 p-2 rounded-md"
            value={flat.id}
            readOnly
          />
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="name"
            name="name"
            className="w-full border-2 p-2 rounded-md"
            defaultValue={flat.title}
          />
          <div className="w-full flex gap-4">
            <select
              onChange={(e) => handleChange(e)}
              name="city"
              className="w-full border-2 p-2 rounded-md"
              defaultValue={flat.city}
            >
              <option value="">Please choose a city</option>
              <option value="Deva">Deva</option>
              <option value="Cluj-Napoca">Cluj-Napoca</option>
              <option value="Sibiu">Sibiu</option>
              <option value="Brasov">Brasov</option>
              <option value="Hunedoara">Hunedoara</option>
              <option value="Bucuresti">Bucuresti</option>
              <option value="Timisoara">Timisoara</option>
              <option value="Arad">Arad</option>
              <option value="Oradea">Oradea</option>
            </select>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Street Name"
              name="streetName"
              className="w-full border-2 p-2 rounded-md"
              defaultValue={flat.streetName}
            />
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              placeholder="Street Number"
              name="streetNumber"
              className="w-full border-2 p-2 rounded-md"
              defaultValue={flat.streetNumber}
            />
          </div>
          <div className="w-full flex gap-4">
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              placeholder="Area Size"
              name="areaSize"
              className="w-full border-2 p-2 rounded-md"
              defaultValue={flat.areaSize}
            />
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="">Has AC</label>
              <input
                onChange={(e) => handleChange(e)}
                type="checkbox"
                placeholder="AC"
                name="hasAC"
                className="w-[100px] border-2 p-2 rounded-md"
                defaultChecked={flat.hasAC}
              />
            </div>
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              placeholder="Year Built"
              name="yearBuilt"
              className="w-full border-2 p-2 rounded-md"
              defaultValue={flat.yearBuilt}
            />
          </div>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="image link"
            name="image"
            className="w-full border-2 p-2 rounded-md"
            defaultValue={flat.image}
          />
          <textarea
            onChange={(e) => handleChange(e)}
            rows={5}
            cols={33}
            placeholder="Enter a description..."
            name="description"
            className="w-full border-2 p-2 rounded-md"
            defaultValue={flat.description}
          ></textarea>
          <div className="w-full flex gap-4">
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              placeholder="price"
              name="rentPrice"
              className="w-full border-2 p-2 rounded-md"
              defaultValue={flat.rentPrice}
            />
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              placeholder="Phone Number"
              name="phone"
              className="w-full border-2 p-2 rounded-md"
              defaultValue={flat.phone}
            />
            <input
              onChange={(e) => handleChange(e)}
              type="date"
              placeholder="Date Available"
              name="dateAvailable"
              className="w-full border-2 p-2 rounded-md"
              defaultValue={flat.dateAvailable}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <Button text="Update" backgroundColor="bg-green-300" handleClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  );
};

export default EditFlat;
