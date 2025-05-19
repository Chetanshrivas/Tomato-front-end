import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx' 
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopUp from './components/LoginPopUp/LoginPopUp.jsx'
import Verify from './pages/Verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
// 🟢 Toastify import
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const[ShoeLogin , setShowLogin] = useState(false)

  return (
  <>
    {ShoeLogin?<LoginPopUp setShowLogin = {setShowLogin} />:<></>}

    <div className='app'>
      <Navbar setShowLogin = {setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/cart" element = {<Cart />} />
        <Route path = "/order" element ={ <PlaceOrder />} />
        <Route path = "/verify" element ={ <Verify />} />
        <Route path = "/myorders" element = { <MyOrders />} />
      </Routes>
    </div>
    <Footer />

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={2} // limits number of toasts shown
          style={{
            width: '90%',
            maxWidth: '400px',
            margin: '0 20px',
            fontSize: '14px',
            wordBreak: 'break-word',
          }}
        />

  </>

)}

export default App