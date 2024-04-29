import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PreLoader from '../../Components/Loading/PreLoader';
import { eventPages } from '../../Api/Endpoints/AppEndPoints'; //api
import { DOMAIN } from '../../Api/config';
// Image
import Logolayout from "../../assets/star_logo.png";
import vector_down from "../../assets/Vector-down.png";
// CSS file
import "./Event_page.css";

  
const Event_page = () => {
  const [events, setEvents] = useState([]);
  const [eventStatus, setEventStatus] = useState();


  useEffect(() => {
    eventPages(
      (response) => {
        if (response.data) {
          setEvents(response.data);
          console.log(response.message);
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
    <>
    <PreLoader/>
    <div className="body">
      <div className="logoLayout">
        <Link to="/">
          <img src={Logolayout} alt="Logo" />
        </Link>
      </div>
      <div className="workshop_container">
        <div className="section_title">
          <div className="section_name">
            <h1>Upcoming Events</h1>
          </div>

          <div className="section_btn">
            <button className="sec_btn_for_types">
              Event Type <img src={vector_down} alt="vector_down" />
            </button>
          </div>
        </div>
        <div className="workshop_cards">
          {events.map(e => (  
            <div className="workshop_card" key={e.id}>
              <div className="workshop_card_img">
                <img src={`${DOMAIN}/main/getImage?path=${e.fields.logo}`} alt={e.fields.logo} height={100} />
              </div>
              <div className="workshop_card_content">
                <div className="workshop_date">
                  <span className="month">{getMonthFromDate(e.fields.date)}</span>
                  <p className="day">{getDayFromDate(e.fields.date)}</p>
                </div>
                <div className="workshop_card_title">
                  <h1>{e.pk}</h1>
                  <p className="workshop_card_description">
                    {e.fields.description} 
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="sec_btn_For_More">
          <button>Load More</button>
        </div> */}
      </div>
      </div>
    </>
  );
};

export default Event_page;

