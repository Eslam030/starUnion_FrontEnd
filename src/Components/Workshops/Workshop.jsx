import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  workShopPages,
  registerWorkShop,
  userRegistrations,
} from "../../Api/Endpoints/AppEndPoints"; // api
import ImageEncode from "../ImageComponents/ImageEncode";
// CSS file
import "./Workshop.css";

const Workshop = () => {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const navigate = useNavigate();
  const [workShop, setWorkShop] = useState([]);
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);
  const today = new Date();

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
      userRegistrations(
        username,
        (response) => {
          setRegisteredWorkshops(response.data);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }, []);

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

  const onClickToRegister = (nameOfWS) => {
    if (!token) {
      navigate("/login");
    } else {
      registerWorkShop(
        token,
        nameOfWS,
        "register",
        (response) => {
          
          setRegisteredWorkshops((prevState) => [
            ...prevState,
            { pk: nameOfWS, status: "register" },
          ]);
          notify();
        },
        (error) => {
          setWS_Register(false);
        }
      );
    }
  };

  const isRegistered = (nameOfWS) => {
    // Check if the workshop is in the list of registered workshops
    return registeredWorkshops.some(
      (ws) =>
        ws.pk === nameOfWS &&
        (ws.status === "register" || ws.status === "taking")
    );
  };

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
    <div className="workshop" id="Workshop">
      <div className="title">
        <h1>Our Workshops</h1>
        <p>
          Highlights the workshops that will be offered during the event,
          including the
          <br />
          topics, speakers, and registration details.
        </p>
      </div>
      <div className="cards_container">
        {workShop.map((w) => (
          <div className="workS_card" key={w.id}>
            <Link to={`/workshops/details/${w.pk}`}>
              <div className="workS_date">{`${getMonthFromDate(
                w.fields.start_date
              )} ${getDayFromDate(w.fields.start_date)} `}</div>
              < ImageEncode imageUrl={w.fields.logo}/>
              <div className="content">
                <h2>{w.pk}</h2>
                {isRegistered(w.pk) ? (
                  <Link>
                    <button className="btn-op registered" disabled>
                      {" "}
                      Registered{" "}
                    </button>
                  </Link>
                ) : (
                  (new Date(w.fields.start_date) > today || w.fields.availability ? 
                    <Link onClick={() => onClickToRegister(w.pk)}>
                    <button className="btn-op"> Register </button>
                  </Link> 
                  : 
                  null
                  )
                )}
              </div>
            </Link>
          </div>
        ))}
        <ToastContainer />
      </div>
      <div className="btn_div">
        <Link to="/workshops">
          <button className="btn-op more" onClick={notify}>
            More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Workshop;
