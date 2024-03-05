import React from 'react'
import './Footer.css'

const Footer = () => {    
    const d = new Date()
    return (
        <footer className='container'>
            <h1><span>Star</span> <br /> Union</h1>
            <div className="footer_content">
                <h4>Our Services</h4>
                <li><a href="">Learning</a></li>
            </div>

            <div className="footer_content">
                <h4>Company</h4>
                <li><a href="">Home</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Workshops</a></li>
                <li><a href="">Events</a></li>
            </div>

            <div className="footer_content">
                <h4>Supports</h4>
                <li><a href="">Contact us</a></li>
            </div>

            <div className="footer_content">
                <h4>Our Social Media</h4>
                <li><a href="">Facebook</a></li>
                <li><a href="">Linkedin</a></li>
            </div>
        <p className="copyRight">© {d.getFullYear()} Star Union - All rights reserved</p>
        </footer>
    )
}
export default Footer