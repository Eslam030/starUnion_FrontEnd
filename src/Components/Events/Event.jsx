
import './Event.css'

const Event = () => {
    return (
        <div className='events' id='Events'>
            <div className="title">
                <h1>Events</h1>
            </div>

        <div className="cards">

        <div className="event">
                <p className='date'>October 15, 2024</p>
                <div className="card">
                    <h1>Web Development </h1>
                    <h1 className='handel'>Workshop</h1>
                    <p>Learn the basics of web development and build your own website.</p>
                </div>
            </div>

            <div className="event">
                <p className='date'>November 5, 2024</p>
                <div className="card">
                    <h1>Digital Marketing</h1>
                    <h1 className='handel'>Seminar</h1>
                    <p>Discover the latest trends in digital marketing and how to leverage them for your business.</p>
                </div>
            </div>

            <div className="event">
                <p className='date'>November 5, 2024</p>
                <div className="card">
                    <h1>Digital Marketing</h1>
                    <h1 className='handel'>Seminar</h1>
                    <p>Discover the latest trends in digital marketing and how to leverage them for your business.</p>
                </div>
            </div>
        </div>

        <div className='btn_div'>
            <button className='btn-op'>More</button>
        </div>
        </div>
    )
}

export default Event