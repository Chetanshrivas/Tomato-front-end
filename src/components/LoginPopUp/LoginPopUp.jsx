import React, {  useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axois from 'axios'
//--------------------------------------------------------------------------------------------
const LoginPopUp = ({setShowLogin}) => {

  const {url ,setToken} = useContext(StoreContext) ;
  const[CurState , setCurState] = useState("Login")
  const [data , setData] = useState({
    name : "",
    email:"",
    password:""
  });

  const onChangeHandler = (event)=>{
      const name = event.target.name ;
      const value = event.target.value ;
      setData( data=>({...data , [name] : value})) ;
  }


  const onLogin = async (event)=>{
    event.preventDefault() ;
    let newUrl = url ;
    if( CurState === "Login"){
      newUrl += "/api/user/login" ;
    }
    else{
      newUrl += "/api/user/register";
    }
    // now we can send the data to the serveror call our api
    const response = await axois.post(newUrl , data) ;

    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token" , response.data.token) ;
      setShowLogin(false) ;
    }
    else{
      alert(response.data.message);   
    }
  }

//----------------------------------------------------------------------------------------------
  return (

    <div className="login-popup">

        <form onSubmit={onLogin} className="login-popup-container">

            <div className="login-popup-title">
                <h2>{CurState}</h2>
                <img  onClick = {()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="login-popup-input">
                {CurState === "Login"?<></> :<input name = 'name' onChange={onChangeHandler} value = {data.name} type="text" placeholder="Your name" required />}
                <input name = 'email' onChange={onChangeHandler} value = {data.email} type="text" placeholder="Your email" required />
                <input name = 'password' onChange={onChangeHandler} value = {data.password} type="password" placeholder="Your password" required />
            </div>

            <button type='submit'>{CurState === "Sign up" ? "Create account" : "Login"}</button>
            
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
            </div>

            {CurState === "Login"
              ?<p>If you don’t have an account , <span onClick={()=>setCurState("Sign up")}>  Sign up</span></p>
              :<p>Already have an account ?<span onClick={()=>setCurState("Login")}> Log in</span></p>
            }    

        </form>

    </div>
  )
}

export default LoginPopUp