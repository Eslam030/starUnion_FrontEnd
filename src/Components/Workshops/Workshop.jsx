import { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom'
import { workShopPages } from '../../Api/Endpoints/AppEndPoints'; // api
import { DOMAIN } from '../../Api/config';
// CSS file
import './Workshop.css'

const Workshop = () => {
    const [workShop, setWorkShop] = useState([]);

    useEffect(() => {
      workShopPages(
        (response) => {
          if (response.data) {
            // Slice the array to keep only the first three events
            setWorkShop(response.data.slice(0, 3));
            if (response.access) {
              console.log(response.access);
            }
            if (response.modified) {
              console.log('Token is modified');
            }
          }
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      )
      }, []);

      const getMonthFromDate = (dateString) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(dateString);
        return months[date.getMonth()];
      };

      const getDayFromDate = (dateString) => {
        const date = new Date(dateString);
        return date.getDate(); 
      };

    return (
        <div className='workshop' id='Workshop'>
            <div className="title">
                <h1>Our Workshops</h1>
                <p>Highlights the workshops that will be offered during the event, including the 
                <br />topics, speakers, and registration details.</p>
            </div>
            <div className="cards_container">
                {workShop.map((w) => (
                  <div className="workS_card" key={w.id}>
                    <Link to={`/workshops/details/${w.pk}`}>             
                        <div className="workS_date">{`${getMonthFromDate(w.fields.start_date)} ${getDayFromDate(w.fields.start_date)} `}</div>
                        <img src={`${DOMAIN}/main/getImage?path=${w.fields.logo}`} alt="workshop Image" />
                        <div className="content">
                            <h2>{w.pk}</h2>
                            <Link to="/register">
                            <button className='btn-op'>Register</button>
                            </Link>
                        </div>
                    </Link>
                  </div>
                ))} 
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