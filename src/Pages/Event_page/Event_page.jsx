import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreLoader from '../../Components/Loading/PreLoader';
import { eventPages, registerEvent, EventRegistration } from '../../Api/Endpoints/AppEndPoints';
import { DOMAIN } from '../../Api/config';
import Logolayout from "../../assets/star_logo.png";
import vector_down from "../../assets/Vector-down.png";
import "./Event_page.css";

const Event_page = () => {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  

  const notify = () => {
    toast.success('Registered Successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notifyError = () => {
    toast.error('Event is already passed!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    eventPages(
      (response) => {
        if (response.data) {
          setEvents(response.data);
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
    );
  }, []);

  useEffect(() => {
    if (token) {
      EventRegistration(username, 'get_user_events',
        (response) => {
          console.log('Registered events:', response.data);
          setRegisteredEvents(response.data);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }, [token, username]);

  const onClickToRegister = (nameOfE) => {
    if (!token) {
      navigate('/login');
    } else {
      registerEvent(token, 'register', nameOfE,
        (response) => {
          if(response.message === 'Event is already passed') {
            notifyError();
          } else {
            setRegisteredEvents(prevState => [...prevState, { pk: nameOfE, registered: true }]);
            console.log(response);
            notify();
          }
        },
        (error) => {
          console.error('Error registering event:', error);
        }
      );
    }
  };

  const isRegistered = (nameOfE) => {
    // Check if the event is in the list of registered events
    return registeredEvents.some(e => e.pk === nameOfE && e.registered === true);
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

  return (
    <>
      <PreLoader />
      <div className="body">
        <div className="logoLayout">
          <Link to="/">
            <img src={Logolayout} alt="Logo" />
          </Link>
        </div>
        <div className="workshop_container">
          <div className="section_title">
            <div className="section_name">
              <h1>All Events</h1>
            </div>
          </div>
          <div className="workshop_cards">
            {events.map(e => (
              <div className="workshop_card" key={e.id}>
                <div className="workshop_card_img">
                  <img src={`${DOMAIN}/main/getImage?path=${e.fields.logo}`} alt={e.fields.logo} height={100} loading='lazy' />
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
                {isRegistered(e.pk) ? (
                  <button className='btn-op registered ev' disabled>Registered</button>
                ) : (
                  <button className='btn-op event' onClick={() => onClickToRegister(e.pk)}>Register</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Event_page;
