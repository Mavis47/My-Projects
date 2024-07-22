import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type UpdateProduct = {
    name: string;
    price: number;
    description: string;
    image: File | null;
    category: string;
    quantity: number;
}

type categoryType = {
  _id: string;
  categoryName: string;
}

export default function UpdateProduct() {
  const [shippingStatus, setShippingStatus] = useState("shipped");
  const [category,setCategory] = useState<categoryType[]>([]);
  const {slug} = useParams();
  const [photo,setPhoto] = useState<File | null>(null);
  const [updateProduct, setUpdateProduct] = useState<UpdateProduct>(
    {
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    image: null,
  }
);

  //   fetching all categories
  const getAllCategories = async () => {
    try {
      const categoryData = await axios.get(
        `http://localhost:7000/api/category/getCategory`
      );
      // console.log("Category Data :- ",categoryData.data.data)
      setCategory(categoryData.data.data)
    } catch (error) {
      console.log("Error :- ", error);
    }
  };

  const getProducts = async() => {
    try {
        const productData = await axios.get(`http://localhost:7000/api/product/get-singleproduct/${slug}`)
        console.log("Product Data :- ",productData.data.data);
        const product = productData.data.data[0];
        if(productData){
            setUpdateProduct({
                name: product.Product_name,
                description: product.Description,
                price: product.Price,
                quantity: product.quantity,
                category: product.category,
                image: product.Product_Image
            })
        }
    } catch (error) {
        console.log("Error :- ", error);
    }
  }

 
  useEffect(() => {
    getAllCategories();
    getProducts();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdateProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target!.files!.length > 0){
        setPhoto(e.target!.files![0]);
    }
}
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const formData = new FormData();
    
    formData.append("Product_name", updateProduct.name);
    formData.append("Description", updateProduct.description);
    formData.append("Price", updateProduct.price.toString());
    formData.append("quantity", updateProduct.quantity.toString());
    formData.append("category", updateProduct.category);
    formData.append("shipping", shippingStatus);
    formData.append('Product_Image',photo!)
    try {
      const response = await axios.put(`http://localhost:7000/api/product/update-product/${slug}`,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log("Response put  ",response);
      toast.success("Product updated successfully");
      
    } catch (error) {
      console.log("Error updating product:", error);
      
    }
  };
  
  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={handleUpdate}>
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Name
          </label>
          <input
            type="text"
            id="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Product Name"
            value={updateProduct.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Description
          </label>
          <input
            type="text"
            id="text"
            name="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Description"
            value={updateProduct.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Price
          </label>
          <input
            type="text"
            id="text"
            name="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Price"
            value={updateProduct.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Quantity
          </label>
          <input
            type="number"
            id="number"
            name="quantity"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Quantity"
            value={updateProduct.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="file"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Product Image
          </label>
          <input
            type="file"
            id="file"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleImageChange}
          />
        </div>
        
        {/* dropdown category */}
        <div className="category-dropdown mb-5">
          <h1 className="block mb-2 text-sm font-medium text-gray-900">Select Category</h1>
          <select
            name="category"
            value={updateProduct.category}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select Category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat.categoryName} className="text-gray-900">{cat.categoryName}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center mb-4">
          <input
            id="shipped-radio"
            type="radio"
            name="shippingStatus"
            value="shipped"
            checked={shippingStatus === "shipped"}
            onChange={() => setShippingStatus("shipped")}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="shipped-radio"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Shipped
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="not-shipped-radio"
            type="radio"
            name="shippingStatus"
            value="notShipped"
            checked={shippingStatus === "notShipped"}
            onChange={() => setShippingStatus("notShipped")}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="not-shipped-radio"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Not Shipped
          </label>
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
