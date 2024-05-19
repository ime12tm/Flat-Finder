import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../App";
import { User } from "../interface";
import { getAllUsers } from "../firebase/methods/Flats/flats";
import Button from "../components/Buttons/ButtonComponent";

const Dashboard = () => {
  const { userDetails } = useContext(UserDataContext);
  const [users, setUsers] = useState([] as User[]);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers as User[]);
    return allUsers;
  };
  useEffect(() => {
    if (userDetails.role !== "admin") {
      navigate("/");
    }
    fetchUsers();
  }, []);

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Date of Birth
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr
              key={user.uid}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.firstName} {user.lastName}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.birthDate}</td>
              <td className="px-6 py-4">{user.role}</td>
              <div className="flex px-6 py-4 gap-5">
                <Button
                  text={"Change Role"}
                  backgroundColor={"bg-green-200"}
                  handleClick={() => handleEdit(flat.id as string)}
                />
                <Button
                  text={"Delete User"}
                  backgroundColor={"bg-red-200"}
                  handleClick={() => handleEdit(flat.id as string)}
                />
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
