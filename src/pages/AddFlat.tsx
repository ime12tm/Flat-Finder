import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { addFlat } from "../firebase/methods/Flats/flats";
import Button from "../components/Buttons/ButtonComponent";
import { Flat } from "../interface";
import { UserDataContext } from "../App";

const AddFlat = () => {
  const [product, setProduct] = useState({} as Flat);
  const { userDetails } = useContext(UserDataContext);

  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("123", { ...product, createdBy: userDetails.email });
    await addFlat({ ...product, createdBy: userDetails.email });
    console.log(product);
    navigate("/");
  };

  return (
    <div className="w-full">
      <div className="w-[50%] m-auto mt-[5%] flex flex-col border-2 p-2 rounded-xl">
        <h2 className="text-xl ml-5 mb-5 mt-5 font-semibold">Add Flat</h2>
        <div className="p-4 flex flex-col justify-center items-start gap-4">
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Enter flat name"
            name="title"
            className="w-full border-2 p-2 rounded-md"
          />
          <div className="w-full flex gap-4">
            <select onChange={(e) => handleChange(e)} name="city" className="w-full border-2 p-2 rounded-md">
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
            />
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              placeholder="Street Number"
              name="streetNumber"
              className="w-full border-2 p-2 rounded-md"
            />
          </div>
          <div className="w-full flex gap-4">
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              placeholder="Area Size"
              name="areaSize"
              className="w-full border-2 p-2 rounded-md"
            />
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="">Has AC</label>
              <input
                onChange={(e) => handleChange(e)}
                type="checkbox"
                placeholder="AC"
                name="hasAC"
                className="w-[100px] border-2 p-2 rounded-md"
              />
            </div>
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              placeholder="Year Built"
              name="yearBuilt"
              className="w-full border-2 p-2 rounded-md"
            />
          </div>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="image link"
            name="image"
            className="w-full border-2 p-2 rounded-md"
          />
          <div className="w-full flex gap-4">
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              placeholder="price"
              name="rentPrice"
              className="w-full border-2 p-2 rounded-md"
            />
            <input
              onChange={(e) => handleChange(e)}
              type="number"
              placeholder="Phone Number"
              name="phone"
              className="w-full border-2 p-2 rounded-md"
            />
            <input
              onChange={(e) => handleChange(e)}
              type="date"
              placeholder="Date Available"
              name="dateAvailable"
              className="w-full border-2 p-2 rounded-md"
            />
          </div>
          <textarea
            onChange={(e) => handleChange(e)}
            rows={5}
            cols={33}
            placeholder="Enter a description..."
            name="description"
            className="w-full border-2 p-2 rounded-md"
          ></textarea>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <Button text="Submit" backgroundColor="bg-blue-500" handleClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  );
};

export default AddFlat;
