import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id="footer">

        <div className="footer-content">
            <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>At Tomato, we’re passionate about bringing delicious meals to your doorstep. Whether you're craving comfort food or exploring new flavors, we've got you covered. Browse our menu, order with ease, and enjoy top-quality service every time. Thank you for choosing us to satisfy your cravings — happy eating! 🍽️</p>
                    <div className="footer-social-icon">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                    </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>
                    GET IN TOUCH
                </h2>
                <ul>
                    <li>+91 8810518815</li>
                    <li>contact@Tomato.com</li>
                </ul>

            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            &copy; 2025 Tomato.com - All rights reserved | Designed by Chetan Shrivas
        </p>

    </div>
  )
}

export default Footer