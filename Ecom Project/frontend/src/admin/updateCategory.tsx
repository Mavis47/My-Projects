import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { toast } from "react-toastify";

export default function UpdateCategory() {
  const { auth } = useAuth();
  const [showCategoryname, setshowCategoryName] = useState("");
  const [newCategoryName,setNewCategoryName] = useState("");
  const {id} = useParams();
  const token = auth.token;

  const getSingleCategory = async () => {
    
    const singleCategory = await axios.get(
      `http://localhost:7000/api/category/getSingleCategory/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const category = singleCategory.data.data;
    if (singleCategory) {
      setshowCategoryName(category.categoryName);
    }
  };
  useEffect(() => {
    getSingleCategory();
  }, []);

  const updateCategory = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const updatedCategory = await axios.put(`http://localhost:7000/api/category/update-category/${id}`,{ 
          categoryName: newCategoryName
        },{
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        // console.log("New Category Name",newCategoryName);
        if(updatedCategory.data.success){
          toast.success("Category Updated Successfully");
          setshowCategoryName(newCategoryName);
        }
      } catch (error) {
        console.log("Error",error);
      }

  }

  return (
    <>
    <h1 className="text-center text-slate-600 font-extrabold mt-6" style={{fontSize: "27px"}}>Update Category</h1>
      <form className="max-w-sm mx-auto mt-6" onSubmit={updateCategory}>
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium "
          >
             Category Name
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Email"
            value={showCategoryname}
            onChange={(e) => setNewCategoryName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
