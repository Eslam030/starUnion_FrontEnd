import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { eventPages } from '../../Api/Endpoints/AppEndPoints'; // api
// CSS file
import './Event.css'

const Event = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
      eventPages(
        (response) => {
          if (response.data) {
            // Slice the array to keep only the first three events
            setEvents(response.data.slice(0, 3));
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

      const getYearFromDate = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
      }
    
    return (
        <div className='events' id='Events'>
            <div className="title">
                <h1>Events</h1>
            </div>

        <div className="cards">
        {events.map((e) =>(

        <div className="event" key={e.id}>
                <p className='date '>{`${getMonthFromDate(e.fields.date)} ${getDayFromDate(e.fields.date)}, ${getYearFromDate(e.fields.date)}`}</p>
                <div className="card">
                    <h1>{e.pk} </h1>
                    <h1 className='handel'>Event</h1>
                    <p>{e.fields.description}</p>
                </div>
            </div>
        ))}

        </div>

        <div className='btn_div'>
            <Link to="events">  
            <button className='btn-op more'>More</button>
            </Link>
        </div>
        </div>
    )
}

export default Event