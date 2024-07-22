import axios from "axios";
import { useCart } from "../contexts/cart.context";
import { useAuth } from "../contexts/auth.context";

import { toast } from "react-toastify";

export type Product = {
  Product_name: string;
  slug: string;
  Description: string;
  Price: number;
  category: string;
  Product_Image: string;
  quantity: number;
  shipping: boolean;
};

export type cartItem = {
  _id: string;
  userID: string;
  product: Product;
  quantity: number;
};

export type quantityProp = {
  quantity: number;
}

export default function CartPage() {
  const { cartItems,grandTotal,refreshCart } = useCart();
  console.log("CartItems data",cartItems);
  const {auth} = useAuth();
  
  const handleDecrese = async(_id: string) => {
    console.log("Decrease Id",_id)
    const decreaseData = await axios.patch(`http://localhost:7000/api/cart/decrement-quantity/${_id}`,{},{
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      refreshCart(); 
      console.log("decrease Data",decreaseData.data.data.quantity);
  }

  const handleIncrease = async(_id: string) => {
    console.log("Increment ID",_id);
    const IncreaseData = await axios.patch(`http://localhost:7000/api/cart/increment-quantity/${_id}`,{},{
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    refreshCart(); 
    console.log("increase Data",IncreaseData.data.data.quantity);
  }

  const handleDelete = async(_id: string) => {
     const data = await axios.delete(`http://localhost:7000/api/cart/delete-cartItems/${_id}`,{
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    refreshCart();
    console.log("Deleted:-",data)
    toast.success("Product Has Been Deleted")
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Image
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.length > 0 &&
              cartItems?.map(({_id,quantity,product}) => (
                
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={_id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img src={product.Product_Image} style={{    width: "68%",height: "126px"}} />
                  </th>
                  <td className="px-6 py-4">{product.Product_name}</td>
                  <td className="px-6 py-4">{product.Description}</td>
                  <td className="px-6 py-4">
                    <button style={{fontSize: "35px",padding: "20px"}} onClick={() => handleDecrese(_id)}>-</button>
                      <span style={{fontSize: "24px"}}>{quantity}</span>
                    <button style={{fontSize: "31px",padding: "20px"}} onClick={() => handleIncrease(_id)}>+</button>
                  </td>
                  <td className="px-6 py-4">&#8377; {product.Price * quantity}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(_id)}>Delete</button>
                  </td>
                </tr>
              ))}
              
          </tbody>
        </table>
        <p style={{fontSize: "30px",textAlign: "center"}}>GrandTotal :- &#8377; {grandTotal}</p>
        <button style={{border: "2px solid red",borderRadius: "4px",textAlign: "center",marginLeft: "47vw",width: "96px",height: "34px",background: "beige"}}>CheckOut</button>
      </div>
    </>
  );
}
