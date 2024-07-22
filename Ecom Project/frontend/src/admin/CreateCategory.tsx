import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";

export default function CreateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Called");
    try {
      const categoryData = await axios.post(
        `http://localhost:7000/api/category/create-category`,
        { categoryName },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      console.log("categoryData", categoryData);
      if (categoryData) {
        toast.success("Category Registered Successfully");
        setCategoryName("");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Error creating category");
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <>
      <h1
        style={{ textAlign: "center", fontSize: "xx-large", padding: "29px" }}
      >
        Create Category
      </h1>
      <form className="max-w-sm mx-auto" onSubmit={handleCategory}>
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Category Name
          </label>

          <input
            type="text"
            id="categoryName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Category Name..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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
      <button
        type="button" style={{marginLeft: "37vw"}}
        className="mt-4 text-white bg-red-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        onClick={handleBack} 
      >
        Go Back
      </button>
    </>
  );
}
