import React from 'react'
import './Home.css'
import Star_logo2 from '../../assets/star logo 2.png'

const Home = () => {
    return (
        <div className='Home_page' id='Home'>
            <div className="txt">
                <h1>Reach the Stars</h1>
                <p>Discover the ultimate destination for all your needs - join us now!</p>
                <button className='btn'>Join Us</button>
            </div>
                <img src={Star_logo2} alt="Star logo" className='star_img'/>
        </div>
    )
}

export default Home