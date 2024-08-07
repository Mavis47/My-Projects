import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/card.css";
import { useAuth } from "../contexts/auth.context";
import { toast } from "react-toastify";

type Product = {
  _id: string;
  Product_name: string;
  slug: string;
  Description: string;
  Price: number;
  category: string;
  Product_Image: string;
  quantity: number;
  shipping: string;
};

type CardProps = {
  selectedCategory: string | null;
  minPrice: number;
  maxPrice: number;
};

export default function Card({ selectedCategory,minPrice, maxPrice  }: CardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  
  const {auth} = useAuth();

  const getAllProduct = async () => {
    try {
      const productData = await axios.get(
        "http://localhost:7000/api/product/get-product"
      );
      setProducts(productData.data.data);
      setLoading(false); 
    } catch (error) {
      console.error("Error Fetching products:", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleCart = async(product: Product) => {
    if(!auth.token){
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push(product)
      localStorage.setItem("cart",JSON.stringify(cart));
      
    }else{
      try {
        const cartData = await axios.post(`http://localhost:7000/api/cart`,{productID: product._id},{
          headers: {
            Authorization: `Bearer ${auth.token}`
          },
        })
        if(cartData){
          toast.success("Product Added to cart Successfully")
        }
      } catch (error) {
        console.log("Error in Handle Cart",error)
        toast.error("Server Error")
      }
      
    }
  }
  
  const filteredProducts = products.filter(product => {
    return (
      (!selectedCategory || product.category._id === selectedCategory) &&
      product.Price >= minPrice &&
      product.Price <= maxPrice
    );
  });
  return (
    <>
      {loading ? (
       
        <div role="status" className="mx-auto" style={{textAlign: "center"}}>
          <svg
            aria-hidden="true"
            className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        // Show products when data is received
        filteredProducts.map((product) => (
          <div className="w-full max-w-sm card bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={product._id}>
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={product.Product_Image}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-white">
                  {product.Product_name}
                </h5>
              </a>
              <div>
                <p className="text-white">
                  Description :- {product.Description}
                </p>
              </div>
              <div>
                <p className="text-white">Quantity :- {product.quantity}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  &#8377; {product.Price}
                </span>
                <button
                  onClick={() => handleCart(product)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </button>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
