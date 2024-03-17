import React from 'react'
import './Workshop.css'
import workshop_img from '../../assets/workshop_img.png'
import { Link } from 'react-router-dom'

const Workshop = () => {
    return (
        <div className='workshop' id='Workshop'>
            <div className="title">
                <h1>Our Workshops</h1>
                <p>Highlights the workshops that will be offered during the event, including the 
                <br />topics, speakers, and registration details.</p>
            </div>
            <div className="cards_container">
                <div className="workS_card">
                    <div className="workS_date">January 18</div>
                    <img src={workshop_img} alt="workshop Image" />
                    <div className="content">
                        <h2>Interactive Workshops</h2>
                        <Link to="/register">
                        <button className='btn-op'>Register</button>
                        </Link>
                    </div>
                </div>
                <div className="workS_card">
                <div className="workS_date">January 18</div>
                    <img src={workshop_img} alt="workshop Image" />
                    <div className="content">
                        <h2>Interactive Workshops</h2>
                        <Link to="/register">
                        <button className='btn-op'>Register</button>
                        </Link>
                    </div>
                </div>
                <div className="workS_card">
                <div className="workS_date">January 18</div>
                    <img src={workshop_img} alt="workshop Image" />
                    <div className="content">
                        <h2>Interactive Workshops</h2>
                        <Link to="/register">
                        <button className='btn-op'>Register</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='btn_div'>
                <Link to="/workshops">
                <button className='btn-op'>More</button>
                </Link>
            </div>
        </div>
    )
}

export default Workshop