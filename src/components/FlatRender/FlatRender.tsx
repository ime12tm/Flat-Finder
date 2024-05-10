import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserDataContext, FlatContext } from "../../App";
// import { addToCart, removeFromCart } from "../../api/methods/products/products";
import { Flat, FlatTableProps } from "../../interface";
import { getAllFlats } from "../../firebase/methods/Flats/flats";
import { NavLink } from "react-router-dom";
import Button from "../Buttons/ButtonComponent";
import { deleteFlat } from "../../firebase/methods/Flats/flats";

const FlatRender = ({ flats, buttonConfig }: FlatTableProps) => {
  const { userDetails } = useContext(UserDataContext);
  const { flatApp, setFlatApp } = useContext(FlatContext);
  const navigate = useNavigate();
  //se poate si destructura
  //   const { text, backgroundColor, handleClick } = buttonConfig;

  const fetchProducts = async () => {
    const allFlats = await getAllFlats();
    setFlatApp(allFlats as Flat[]);
    return allFlats;
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
    } else if (userDetails.role !== "admin") {
      navigate("/");
    }
    fetchProducts();
  }, []);

  return (
    <>
      <div className="container w-[1280px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto gap-4 ">
        {flats.map((flat: Flat) => (
          <div key={flat.id} className="flex justify-between items-center w-full gap-10">
            <div className="mt-10 p-3 w-[420px] h-[600px] border flex flex-col justify-start items-center gap-10">
              <img src={flat.image} className="w-full" />
              <div className="flex flex-col justify-start items-start">
                <p className="text-xl font-bold pb-5">{flat.title}</p>
                <div className="flex gap-2 pb-5">
                  <p>{flat.city} |</p>
                  <p>
                    Price: <span>{flat.rentPrice}$/month |</span>
                  </p>
                  <p>From {flat.dateAvailable}</p>
                </div>
                <p className="pb-5">{flat.description}</p>
                <div className="flex gap-4 justify-center items-end">
                  <NavLink to={`/flat/${flat.id}`} className="font-bold text-lg">
                    See More...
                  </NavLink>
                  <Button text="Add To Favorite" backgroundColor="bg-orange-300" handleClick={() => handleFav()} />
                  {userDetails.role === "admin" ? (
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
                  ) : null}
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

            {/* <Button
              text={buttonConfig.text}
              backgroundColor={buttonConfig.backgroundColor}
              handleClick={() => handleAddCart(product.id as string)}
            /> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default FlatRender;

// return (
//     <>
//       {buttonConfig.isRemoveCart ? (
//         <div className="flex flex-col items-center justify-center gap-4 mt-10 p-4">
//           {completeCart.map((product: Product) => (
//             <div key={product.id} className="flex justify-between items-center w-full gap-10">
//               <div className="flex justify-center items-center gap-10">
//                 <img src={product.image} className="w-[100px]" />
//                 <div className="flex flex-col justify-start items-start">
//                   <p>{product.name}</p>
//                   {/* <p>Pieces: {product.quantityInCart}</p>
//                   <p>Total: {Number(product.quantityInCart) * Number(product.price)} $</p> */}
//                 </div>
//               </div>
//               <div className="flex gap-4">
//                 <Button
//                   handleClick={() => handleEditCart(product.id as string)}
//                   text="Edit"
//                   backgroundColor={buttonConfig.backgroundColor}
//                 />
//                 <Button
//                   handleClick={() => handleRemoveCart(product.id as string)}
//                   text="Remove from cart"
//                   backgroundColor={buttonConfig.backgroundColor}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center gap-4 mt-10 p-4">
//           {products.map((product: Product) => (
//             <div key={product.id} className="flex justify-between items-center w-full gap-10">
//               <div className="flex justify-center items-center gap-10">
//                 <img src={product.image} className="w-[100px]" />
//                 <div className="flex flex-col justify-start items-start">
//                   <p>{product.name}</p>
//                   <p>{product.description}</p>
//                   <p>
//                     Price: <span>{product.price} $</span>
//                   </p>
//                   <p>{product.quantity > 0 ? "In stock" : "Out of stock"}</p>
//                 </div>
//               </div>

//               <Button
//                 text={buttonConfig.text}
//                 backgroundColor={buttonConfig.backgroundColor}
//                 handleClick={() => handleAddCart(product.id as string)}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
