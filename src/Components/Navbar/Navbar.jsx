import React from 'react'
import './Navbar.css'
import star_logo from '../../assets/star_logo.png'
import User_01 from '../../assets/User_01.png'

const Navbar = () => {
    return (
        <nav>
            <a href="#Home"><img src={star_logo} alt="Logo" className='logo'/></a>
            <ul>
                <li><a href="#Home">Home</a></li>
                <li><a href="">About US</a></li>
                <li><a href="">Events</a></li>
                <li><a href="">Workshop</a></li>
                <li><a href="">Contact Us</a></li>
            </ul>
            <button className='login'>Log In <img src={User_01} alt="User" className='user_img'/></button>
        </nav>
    )
}

export default Navbar