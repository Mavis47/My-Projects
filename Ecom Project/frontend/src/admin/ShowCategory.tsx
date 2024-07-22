import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/auth.context";

type categoryType = {
    _id: string;
    categoryName: string;
    slug: string;
}

export default function ShowCategory() {

    const [categories,setCategories] = useState<categoryType []>([])
    const {auth} = useAuth();
    const navigate = useNavigate()

    const getAllCategories = async () => {
        try {
          const categoryData = await axios.get(
            `http://localhost:7000/api/category/getCategory`
          );
          setCategories(categoryData.data.data)
        } catch (error) {
          console.log("Error :- ", error);
        }
      };

      useEffect(()=>{
        getAllCategories();
      },[])

      const handleDelete = async(categoryId: string) => {
        try {
            const answer = window.prompt("Are You Sure you want to delete this Product?");
        if(!answer){
            return;
        } 
        const token = auth.token;
         await axios.delete(`http://localhost:7000/api/category/deleteCategory/${categoryId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
         toast.success("Product Deleted");

         setCategories(categories.filter(category => category._id !== categoryId))
        } catch (error) {
            toast.error("Category Deleted");
            console.log("Error In Deleting Category",error);
        }
        
      }

      const handleUpdate = async(id: string) => {
        navigate(`/dashboard/admin/update-category/${id}`);     
      }

  return (
    <>
      <div className="relative overflow-x-auto" style={{margin: "112px"}}>
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3" style={{fontSize: "large",color: "brown"}}>
                Category Id
              </th>
              <th scope="col" className="px-6 py-3" style={{fontSize: "large",color: "brown"}}>
                Category Name
              </th>
              <th scope="col" className="px-6 py-3" style={{fontSize: "large",color: "brown"}}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat)=>(
                <tr className="bg-white border-b" key={cat._id}>
                <td className="px-6 py-4">{cat._id}</td>
                <td className="px-6 py-4">{cat.categoryName}</td>
                <td>
                <button className="px-6 py-4" onClick={() => handleDelete(cat._id)}>Delete</button>
                <button className="px-6 py-4" onClick={() => handleUpdate(cat._id)}>Update</button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </>
  );
}
