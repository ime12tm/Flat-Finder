import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FlatContext, UserDataContext } from "../App";
import {
  deleteFlat,
  getAllFlats,
} from "../firebase/methods/Flats/flats";
import Button from "../components/Buttons/ButtonComponent";
import { Flat } from "../interface";

const Dashboard = () => {
  const { flatApp, setFlatApp } = useContext(FlatContext);
  const { userDetails } = useContext(UserDataContext);

  const navigate = useNavigate();

  // const fetchProducts = async () => {
  //   const allProducts = await getAllProducts();
  //   setProducts(allProducts as Product[]);
  //   return allProducts;
  // };

  // const handleEdit = (id: string) => {
  //   navigate(`/edit/${id}`);
  // };

  // const handleDelete = async (id: string) => {
  //   //logica confirmare -> if yes
  //   await deleteProduct(id);
  //   await fetchProducts();
  // };

  // useEffect(() => {
  //   if (!JSON.parse(localStorage.getItem("loggedUser") as string)) {
  //     navigate("/login");
  //   } else if (userDetails.role !== "admin") {
  //     navigate("/");
  //   }
  //   fetchProducts();
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-10 p-4">
      <div className="flex justify-start items-start w-full mb-4">
        <Button
          text={"Add new product"}
          backgroundColor={"bg-gray-200"}
          handleClick={() => navigate("/add-product")}
        />
      </div>

      {/* {products.map((product: Product) => (
        <div
          key={product.id}
          className="flex justify-between items-center w-full gap-10"
        >
          <div className="flex justify-center items-center gap-10">
            <img src={product.image} className="w-[100px]" />
            <div className="flex flex-col justify-start items-start">
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>
                Price: <span>{product.price} $</span>
              </p>
              <p>{product.quantity > 0 ? "In stock" : "Out of stock"}</p>
            </div>
          </div> */}

          <div className="flex gap-4">
            <Button
              text={"Edit"}
              backgroundColor={"bg-gray-200"}
              handleClick={() => handleEdit(product.id as string)}
            />
            <Button
              text={"Delete"}
              backgroundColor={"bg-red-500"}
              handleClick={() => handleDelete(product.id as string)}
            />
          </div>
        {/* </div> */}
      {/* })} */}
    </div>
  );
};

export default Dashboard;
