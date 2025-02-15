import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null)

export default function CartProvider({children}) {
    const [cartInfo , setCartInfo] = useState(null)
    
    const {token} = useContext(UserContext)

    // * Add product
    async function addProductToCart({productId}) {
        let toastId = toast.loading("Adding product to cart .. 🔃")
        
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token
                },
                data: {
                    productId
                },
            }
            
            let {data} = await axios.request(options);
            if (data.status == "success"){
                toast.success(data.message)
                getCartProducts()
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(toastId)
        }
    }
    
    // * Get products
    async function getCartProducts() {
        try {
            const options={
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token,
                },
            }
            
            let {data} = await axios.request(options)
            if(data.status == "success"){
                setCartInfo(data)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    // ! Remove product
    async function removeProductFromCart({productId}) {
        let toastId = toast.loading('Removing product from cart...')
        try {
            const options={
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "DELETE",
                headers: {
                    token,
            },
            }
            let {data} = await axios.request(options)
            if(data.status == "success"){
                toast.success("Product has been deleted")
                setCartInfo(data)
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(toastId)
        }
    }

    // TODO: Clear cart btn
    async function clearCart() {
        let toastId = toast.loading('Clearing cart...')
        try {
            const options={
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "DELETE",
                headers: {
                    token
                }
            }
            let {data} = await axios.request(options)
            toast.success("Your cart is now empty.")
            if(data.message == "success"){
                setCartInfo({
                    numOfCartItems: 0,
                })
            }
        } catch (error) {
            console.log(error);
            
        } finally {
            toast.dismiss(toastId)
        }
    }

    // ^ Update count
    async function updateProductCount({productId, count}) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "PUT",
                headers: {
                    token,
                },
                data:{
                    count
                }
            }
            let {data} = await axios.request(options)
            if(data.status == "success"){
                setCartInfo(data)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return <CartContext.Provider value={{addProductToCart , getCartProducts, cartInfo, removeProductFromCart, clearCart, updateProductCount}}>
        {children}
    </CartContext.Provider>
}