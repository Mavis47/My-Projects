import { createContext, useContext, useEffect, useState } from "react";
import { cartItem } from "../pages/CartPage"
import { useAuth } from "./auth.context";
import axios from "axios";

type CartContextProps = {
    cartItems: cartItem[];
    totalItems: number;
    refreshCart: () => void;
    grandTotal: number;
    quantity:number;
    
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [cartItems,setCartItems] = useState<cartItem[]>([]);
    const [grandTotal,setGrandTotal] = useState<number>(0);
    const [quantity,setQuantity] = useState<number>(1);

    const {auth} = useAuth();

    const fetchCartItems = async() => {
        try {
            const cartData = await axios.get<{data: {cartItems: cartItem[],grandTotal:number,quantity:number}}>(`http://localhost:7000/api/cart`,{
                headers: {Authorization: `Bearer ${auth.token}`}
            })
            // console.log("Cart Data Fetch",cartData.data.data.cartItems);
            if(cartData){
                setCartItems(cartData.data.data.cartItems || []);
                setGrandTotal(cartData.data.data.grandTotal);
                setQuantity(cartData.data.data.quantity);
            }
        } catch (error) {
            console.log("Error in fetching cartItems",error);
        }
        
    }

    useEffect(()=>{
        if(auth.token){
            fetchCartItems();
          }
        //   else{
        //     const localStorageCart = localStorage.getItem('cart');
        //     if(localStorageCart){
        //         const parsedCartData = JSON.parse(localStorageCart);
        //         setCartItems(parsedCartData);
        //     }
        // }
    },[auth.token])

    return (
        <CartContext.Provider value={{cartItems,totalItems: cartItems.length,refreshCart: fetchCartItems,grandTotal,quantity}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context){
        throw new  Error('UseCart must be used within a cartProvider')
    }
    return context;
}