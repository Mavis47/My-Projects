import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Products = {
  _id: string;
  Product_Image: string;
  Product_name: string;
  slug: string;
  Description: string;
  Price: number;
  quantity: number;
  shipping: boolean;
};

export default function ShowProducts() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // fetching all the products
  const getAllProducts = async () => {
    try {
      const getProducts = await axios.get(
        "http://localhost:7000/api/product/get-product"
      );
      if (getProducts) {
        setProducts(getProducts.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleUpdate = (slug: string) =>{
    navigate(`/dashboard/admin/update-product/${slug}`);
  }

  const handleDelete = async(productId: string) => {
    try {
      const answer = window.prompt("Are You Sure you want to delete this Product?");
      if(!answer){
        return;
      } 
       await axios.delete(`http://localhost:7000/api/product/delete-product/${productId}`)
       toast.success("Product Deleted Successfully")

      //  
       setProducts(products.filter(product => product._id !== productId));
    }catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="relative overflow-x-auto mt-6">
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead
              className="text-xs text-gray-700 uppercase bg-gray-50 "
              style={{ background: "bisque" }}
            >
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Shipping
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className="bg-white border-b " key={product._id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium "
                    style={{ background: "rgb(215 251 252)" }}
                  >
                    <img
                      src={product.Product_Image}
                      style={{ width: "63%", height: "100px" }}
                    />
                  </th>
                  <td
                    className="px-6 py-4"
                    style={{ background: "rgb(215 251 252)" }}
                  >
                    {product.Product_name}
                  </td>
                  <td
                    className="px-6 py-4"
                    style={{ background: "rgb(215 251 252)" }}
                  >
                    {product.Description}
                  </td>
                  <td
                    className="px-6 py-4"
                    style={{ background: "rgb(215 251 252)" }}
                  >
                    &#8377;{product.Price}
                  </td>
                  <td
                    className="px-6 py-4"
                    style={{ background: "rgb(215 251 252)" }}
                  >
                    {product.quantity}
                  </td>
                  <td
                    className="px-6 py-4"
                    style={{ background: "rgb(215 251 252)" }}
                  >
                    {product.shipping ? (
                      <span>Shipped</span>
                    ) : (
                      <span>Not Shipped</span>
                    )}
                  </td>
                  <td
                    className="px-6 py-4 dark:text-purple-400"
                    style={{ background: "rgb(215 251 252)" }}
                  >
                    <button className="text-red-600 mr-6" onClick={() => handleDelete(product._id)}>Delete</button>
                    <button className="text-cyan-600" onClick={() => handleUpdate(product.slug)}>
                      Edit
                    </button>
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
