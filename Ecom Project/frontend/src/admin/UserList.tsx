import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const UserList = () => {

  const [users,setUsers] = useState<Product []>([]);
  const [loading,setLoading] = useState(true);

  const getAllUser = async() =>{
    try {
      const userData = await axios.get("http://localhost:7000/api/auth/getUsers");
      console.log("Userdata",userData)
      console.log("user Details",userData.data.data);
      if(userData){
        setUsers(userData.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
      console.log("Error",error);
    }
  }
  useEffect(()=>{
    getAllUser();
  },[])

  return (
    <>
    {loading ? (
      <div>Loading</div>
    ) : (
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 " style={{fontSize: "medium"}}>
            <tr>
              <th scope="col" className="px-6 py-3">
               Username
              </th>
              <th scope="col" className="px-6 py-3">
                User Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                User Address
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
             <tr className="bg-white border-b " style={{fontSize: "medium"}}>
             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-purple-400">
                {user.name}
             </th>
             <td className="px-6 py-4 dark:text-purple-400">
                 {user.email}
             </td>
             <td className="px-6 py-4 dark:text-purple-400">
                 {user.phone}
             </td>
             <td className="px-6 py-4 dark:text-purple-400">
                 {user.address}
             </td>
             <td className="px-6 py-4 dark:text-purple-400">
              <button className="text-red-600 mr-6">Delete</button>
              <button className="text-cyan-600">Edit</button>
             </td>
         </tr>
          ))}
          </tbody>
        </table>
      </div>
    )}
      
    </>
  );
}
