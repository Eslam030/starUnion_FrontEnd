import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreLoader from "../../Components/Loading/PreLoader";
import {
  eventPages,
  registerEvent,
  EventRegistration,
} from "../../Api/Endpoints/AppEndPoints";
import ImageEncode from "../../Components/ImageComponents/ImageEncode";
import Logolayout from "../../assets/star_logo.png";
import "./Event_page.css";

const Event_page = () => {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  
  const navigate = useNavigate();
  const location = useLocation();

  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [pastEvent, setPastEvent] = useState(false); // State to track if event is past
  const [SpecialEventName, setSpecialEventName] = useState("");
  const [isSpecialEvent, setIsSpecialEvent] = useState(false);


  const notify = () => {
    toast.success("Registered Successfully!", {
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
    toast.error("Event is already passed!", {
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
          const isPastEvent = response.data.some((ev) => ev.status === "PA");
          const specialEvent = response.data.filter(ev => ev.special === true); 
          const spacialEvent = specialEvent.map((ev) => ev.pk);
          setPastEvent(isPastEvent);
          setSpecialEventName(spacialEvent)
          setIsSpecialEvent(specialEvent.length  > 0);
          if (response.access) {
            console.log(response.access);
          }
          if (response.modified) {
            console.log("Token is modified");
          }
        }
      },
      (error) => {
        console.error("Error fetching events:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (token) {
      EventRegistration(
        username,
        "get_user_events",
        (response) => {
          setRegisteredEvents(response.data);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }, [token, username]);

  const onClickToRegister = useCallback(
    (nameOfE, companyName) => {
      const isSpecial = SpecialEventName.includes(nameOfE);
      if (isSpecial) {
        navigate(`/events/${companyName}/${nameOfE}`);
      } else if (!token) {
        navigate("/login", {
          state: {
            previousUrl: location.pathname + location.search
          }
        });
      } else {
        registerEvent(
          token,
          "register",
          nameOfE,
          (response) => {
            if (response.message === "Event is already passed") {
              notifyError();
            } else {
              setRegisteredEvents((prevState) => [
                ...prevState,
                { pk: nameOfE, registered: true },
              ]);
              notify();
            }
          },
          (error) => {
            console.error("Error registering event:", error);
          }
        );
      }
    },
    [token, navigate, notify, notifyError]
  );

  const isRegistered = useCallback(
    (nameOfE) => {
      return registeredEvents.some((e) => e.pk === nameOfE && e.registered);
    },
    [registeredEvents]
  );

  const getMonthFromDate = (dateString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
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
        <div className="workshop_container Event_container">
          <div className="section_title">
            <div className="section_name">
              <h1>All Events</h1>
            </div>
          </div>
          <div className="workshop_cards">
            {events.map((e) => (
              <div className="workshop_card" key={e.id}>
                <div className="workshop_card_img">
                  <ImageEncode imageUrl={e.fields.logo}/>
                </div>
                <div className="workshop_card_content">
                  <div className="workshop_date">
                    <span className="month">
                      {getMonthFromDate(e.fields.date)}
                    </span>
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
                  <button className="btn-op registered ev" disabled>
                    Registered
                  </button>
                ) : (
                  <button
                    className="btn-op event"
                    onClick={() => onClickToRegister(e.pk, e.company)}
                  >
                    Register
                  </button>
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
