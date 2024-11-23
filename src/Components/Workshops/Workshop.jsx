import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  workShopPages,
  registerWorkShop,
  userRegistrations,
} from "../../Api/Endpoints/AppEndPoints"; // api
import useIsAuthUser from "../../Auth/useAuthUserCookies";
import ImageEncode from "../ImageComponents/ImageEncode";
// CSS file
import "./Workshop.css";

const Workshop = () => {
  const {isAuthUser, userAuthName} = useIsAuthUser()
  const navigate = useNavigate();
  const [workShop, setWorkShop] = useState([]);
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);
  const today = new Date();


  const notify_Succ = () => {
    toast.success("Registered Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      onClose: () => {
        // Do nothing here to prevent unwanted navigation
      },
    });
  };


  useEffect(() => {
    workShopPages(
      (response) => {
        if (response.data) {
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
    if (isAuthUser) {
      userRegistrations(
        userAuthName,
        (response) => {
          setRegisteredWorkshops(response.data);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  },[isAuthUser,userAuthName]);


  const onClickToRegister = (nameOfWS) => {
    if (!isAuthUser) {
      navigate("/login");
    } else {
      registerWorkShop(
        nameOfWS,
        "register",
        (response) => {
          console.log(response);
          setRegisteredWorkshops((prevState) => [
            ...prevState,
            { pk: nameOfWS, status: "register" },
          ]);
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
        {workShop.map((w, index) => (
          <div className="workS_card" key={index}>
            <Link to={`/workshops/details/${w.pk}`} >
              <div className="workS_date">{`${getMonthFromDate(
                w.fields.start_date
              )} ${getDayFromDate(w.fields.start_date)} `}</div>
              < ImageEncode imageUrl={w.fields.logo}/>
              <div className="content">
                <h2>{w.pk}</h2>
                {isRegistered(w.pk) ? (
                    <button className="btn-op registered" disabled>
                      {" "}
                      Registered{" "}
                    </button>
                ) : (
                  (new Date(w.fields.start_date) > today || w.fields.availability ? 
                    <Link onClick={() => onClickToRegister(w.pk)}>
                    <button className="btn-op"> Register </button>
                  </Link> 
                  : 
                  <button className="btn-op disabled" disabled> Passed </button>
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
          <button className="btn-op more" onClick={notify_Succ}>
            More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Workshop;
