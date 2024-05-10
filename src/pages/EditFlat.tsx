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
    setFlat((await getFlat(id as string)) as Flat);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFlat({ ...flat, [name]: value });
  };

  const handleSubmit = async () => {
    await updateFlat(flat);
    navigate("/dashboard");
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
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="description"
            name="description"
            className="w-full border-2 p-2 rounded-md"
            defaultValue={flat.description}
          />
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="image link"
            name="image"
            className="w-full border-2 p-2 rounded-md"
            defaultValue={flat.image}
          />
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            placeholder="price"
            name="price"
            className="w-full border-2 p-2 rounded-md"
            defaultValue={flat.price}
          />
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            placeholder="quantity"
            name="quantity"
            className="w-full border-2 p-2 rounded-md"
            defaultValue={flat.city}
          />
        </div>
        <div className="flex flex-col gap-3 p-4">
          <Button text="Update" backgroundColor="bg-green-300" handleClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  );
};

export default EditFlat;
