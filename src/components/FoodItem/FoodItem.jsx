import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const FoodItem = ({id , name , price , image , discription}) => {

  //const[itemcount , setItemcount] = useState(0)
  const{ cartItem , addToCart , removeFromCart , url} = useContext(StoreContext) 

  return (

    <div className="food-item">
        <div className="food-item-imgcontainer">
            <img  className = "food-item-img" src={image} alt={name} />
            { 
              !cartItem[id]
                        ?<img className = 'add' onClick={()=> addToCart(id)}  src={assets.add_icon_white} alt="" />
                        :<div className='food-item-counter'>
                            <img  onClick={ ()=>removeFromCart(id)}  src={assets.remove_icon_red} alt="" />
                            <p>{cartItem[id]}</p>
                            <img  onClick={ ()=>addToCart(id)}  src={assets.add_icon_green}alt="" />
                        </div>
            }
        </div>

        <div className="food-item-info">
            <div className="food-item-name">
                <p> {name} </p>
                <img src={assets.rating_starts} alt="" />
            </div>
             
             <p className="food-item-desc">
                {discription}
             </p>

             <p className="food-item-price">
                  &#8377;  {price}
             </p>
        </div>


    </div>

  )
}

export default FoodItem