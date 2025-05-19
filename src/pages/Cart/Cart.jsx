import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (getTotalCartAmount() === 0) {
      toast.warn('Your cart is empty!', { position: 'top-center' })
      return
    }

    if (!token) {
      toast.error('Please log in first!', { position: 'top-center' })
      return
    }

    toast.success('Proceeding to checkout...', { position: 'top-center' })
    setTimeout(() => {
      navigate('/order')
    }, 1000)
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>&#8377; {item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>&#8377; {cartItem[item._id] * item.price}</p>
                  <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            )
          }
          return null
        })}
      </div>

      <div className="cart-bottom">
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
              <p>&#8377; {getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <b>Total</b>
              <b>&#8377; {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</b>
            </div>
          </div>
          <button onClick={handleCheckout}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promo">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promo-input">
              <input type="text" placeholder='FREE30' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
