import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { eventPages } from '../../Api/Endpoints/AppEndPoints'; // api
import { setSpacialEventPassed } from '../../Auth/authSlice';
// CSS file
import './Event.css'

const Event = () => {
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => { 
      eventPages(
        (response) => {
          const specialEvent = response.data.filter(ev => ev.special === true); 
          const spacialEventDate = specialEvent.map((ev) => ev.fields.date);
          const spacialEventDateStatus = specialEvent.map((ev) => ev.fields.status);
          // For closing the spacial events route
          const spacialEventStatus = specialEvent.map((ev) => ev.fields.status);

          // Check if any event's status is "PA"
          const isPast = spacialEventStatus.some(status => status === "PA");
          const hasActiveEvent = spacialEventStatus.some(status => status === "CM" || status === "CW");
      
          const shouldCloseRoute = isPast && !hasActiveEvent;

          dispatch(setSpacialEventPassed(shouldCloseRoute));

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

      const isEventPast = (eventDate) => {
        const today = new Date();
        const eventDateObj = new Date(eventDate);
        return eventDateObj < today;
      };
    
    
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