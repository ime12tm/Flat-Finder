import "./App.css";
import AppRoutes from "./Routes/routes";
import SpinnerLoader from "./components/SpinnerLoader/SpinnerLoader";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "./interface";
import { fetchUser } from "./firebase/api/auth";
import { Flat } from "./interface";
import { ToastProvider } from "./contexts/ToastContext";

interface UserDataContextInt {
  userDetails: User;
  setUserDetails: Dispatch<SetStateAction<User>>;
}
interface FlatContextInt {
  flatApp: Flat[];
  setFlatApp: Dispatch<SetStateAction<Flat[]>>;
}
interface FavContextInt {
  favorite: Flat[];
  setFavorite: Dispatch<SetStateAction<Flat[]>>;
}

export const UserDataContext = createContext({} as UserDataContextInt);
export const FlatContext = createContext({} as FlatContextInt);
export const FavContext = createContext({} as FavContextInt);

function App() {
  const [userDetails, setUserDetails] = useState({} as User);
  const [flatApp, setFlatApp] = useState([] as Flat[]);
  const [favorite, setFavorite] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string) || "";
    try {
      setLoading(true);

      if (loggedUser.length) {
        const user = await fetchUser(loggedUser);
        console.log(user);
        setUserDetails(user as User);

        // setFavorite((await getSpecificProducts(user?.cart as CartProduct[])) as Product[]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <SpinnerLoader />;
  }
  return (
    <ToastProvider>
      <FlatContext.Provider value={{ flatApp, setFlatApp }}>
        <UserDataContext.Provider value={{ userDetails, setUserDetails }}>
          <FavContext.Provider value={{ favorite, setFavorite }}>
            <AppRoutes />
          </FavContext.Provider>
        </UserDataContext.Provider>
      </FlatContext.Provider>
    </ToastProvider>
  );
}

export default App;
