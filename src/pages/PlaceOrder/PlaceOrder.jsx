import React, {useEffect, useState } from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom' ;

const PlaceOrder = () => {
  const {getTotalCartAmount , token , food_list , cartItem , url} = useContext(StoreContext)
  const [data , setData] = useState({
      firstName : "",
      lastName : "",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
  })

  const onChangeHandler  = (event) => {
      const name = event.target.name ;
      const value = event.target.value ;
      setData(data=>({...data ,[name]:value}));
  }

  const placeOrder = async (event) => {
    event.preventDefault() ;
    let orderItems = [] ;
    food_list.map( (item)=>{
        if(cartItem[item._id] > 0){
            let itemInfo = item ;
            itemInfo["quantity"] = cartItem[item._id] ;
            orderItems.push(itemInfo) ;
        }
    }) ;

    // Prevent placing order if cart is actually empty after filtering
    if (orderItems.length === 0) {
      alert("Your cart is empty!");
      return;
 }

    let orderData = {
        address : data ,
        items : orderItems ,
        amount : getTotalCartAmount() + 50 ,
    }

    let response = await axios.post(url + "/api/order/place" , orderData ,{headers:{token}});
    if(response.data.success){
      const { session_url} = response.data ;
      window.location.replace(session_url) ;
    }
    else{
      alert("Error") ;
      console.log(error.massage) ;
    }
  }

  const navigate = useNavigate();
  useEffect( ()=>{
      if(!token){
          navigate("/cart")
      }
      else if(getTotalCartAmount()===0 ){
        navigate("/cart")
      }
  },[token])

  
  return (
    <form onSubmit={placeOrder} className='place-order'>
{/* -------------------------------------------------------------------------------------------------------------- */}
      <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fileds">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First-name'/>
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last-name'/>
          </div>
             <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='contact@gamil'/>
             <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
          <div className="multi-fileds">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
          </div>
          <div className="multi-fileds">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip-code'/>
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
          </div>
             <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
      </div>
{/*-------------------------------------------------------------------------------------------------------------- */}
      <div className="place-order-right">
          <div className="cart-total">
               <h2>Cart Total</h2>
                 <div> 
                      <div className="card-total-details">
                        <p>Subtotal</p>
                        <p>&#8377; {getTotalCartAmount()}</p>
                      </div>
                      <hr />

                      <div className="card-total-details">
                        <p>Delivery fee</p>
                        <p>&#8377; {getTotalCartAmount()===0?"0":"50"}</p>
                      </div>
                      <hr />

                      <div className="card-total-details">
                        <b>Total</b>
                        <b> &#8377; { getTotalCartAmount()===0?"0":getTotalCartAmount() + 50}</b>
                      </div>
                 </div>
            <button type='submit' >PROCEED TO PAYMENT</button>
          </div>
      </div>
{/*--------------------------------------------------------------------------------------------------------------- */}
    </form>
  )
}

export default PlaceOrder