import { createContext, useEffect, useState } from "react";
import axois from 'axios'

export const StoreContext = createContext(null); // yaha context create liya
const StoreContextProvider = (props)=>{ 

//---------------------------------------------------------------------------------------------------------
    // to add to cart and if added increase the quantity of the item
    const[cartItem , setCartItem] = useState({})
    const url = "https://tomato-backend-seven.vercel.app";
    const [token , setToken] = useState(""); // this is for the token of the user
    const [food_list , setFoodList] = useState([]) ;

    //add to cart
    const addToCart = async (itemId) => {
        if(!cartItem[itemId]){
            setCartItem( (prev)=>({ ...prev, [itemId]: 1 }) );
        }
        else{
            setCartItem( (prev)=>({ ...prev, [itemId]: prev[itemId] + 1 }) );
        }
        if(token){
            await axois.post(url + "/api/cart/add" , { itemId } , {headers:{token}}) ;
        }
    }
    // to remove item from cart
    const removeFromCart = async (itemId) => {
        setCartItem( (prev)=>({...prev , [itemId]: prev[itemId] - 1}) );
        if(token){
            await axois.post(url + "/api/cart/remove" , { itemId } , {headers:{token}}) ;
        }
    }
    //logic for subtotal and total rupees
    const getTotalCartAmount = ()=>{
        let total = 0;
        for(const item in cartItem)
          {
            if(cartItem[item] >0){

            let itemInfo = food_list.find( (product)=>product._id === item );
            total += itemInfo.price * cartItem[item];

            }
          } 
          return total;
        }

    const fetchFoodList = async ()=>{
        const response = await axois.get( url + "/api/food/list") ;
        setFoodList(response.data.data);
        }   

    const loadCartData = async (token)=>{
        const response = await axois.post(url + "/api/cart/get" , {} , {headers:{token}}) ;
        setCartItem(response.data.cartData);
        }

//---------------------------------------------------------------------------------------------------------

    // this logic is for when we reload the page we still hav token in application
    useEffect( ()=>{

          async function loadData() {
            await fetchFoodList();
            if( localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
              }
          }
          loadData(); 
     },[])



    const contextValue = { // yaha context value definemdi ki kya bhejna hai or fir return mr bhej di
        food_list ,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount , 
        url ,
        token ,
        setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider ; // yaha se export kr diya