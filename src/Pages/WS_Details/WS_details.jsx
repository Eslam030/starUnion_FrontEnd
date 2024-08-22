import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from 'react-redux';
import PreLoader from '../../Components/Loading/PreLoader';
import ImageEncode from "../../Components/ImageComponents/ImageEncode";
import { workShopDetails, instructors, Tob5, registerWorkShop, userRegistrations } from "../../Api/Endpoints/AppEndPoints"; // api
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// Images
import Logolayout from "../../assets/star_logo2.png";
import dot from "../../assets/Ellipse.png";
import vector_down from "../../assets/Polygon.png";
// CSS file
import "./WS_details.css";

const WS_details = () => {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const today = new Date();
  const [state, setState] = useState({
    btnState1: false,
    btnState2: false,
    workShop: [],
    instructorData: [],
    registeredWorkshops: [],
    Tob5Data: [],
  });
  
  const { btnState1, btnState2, workShop, instructorData, registeredWorkshops, Tob5Data } = state;

  const addActive1 = useCallback(() => {
    setState(prevState => ({ ...prevState, btnState1: !prevState.btnState1 }));
  }, []);

  const addActive2 = useCallback(() => {
    setState(prevState => ({ ...prevState, btnState2: !prevState.btnState2 }));
  }, []);

  const notify = useCallback(() => {
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
  }, []);

  const toggleClassCheck1 = btnState1 ? "active" : null;
  const toggleClassCheck2 = btnState2 ? "active" : null;

  useEffect(() => {
    workShopDetails(name,
      (response) => {
        if (response.data) {
          const updatedWorkshops = response.data.map(workshop => {
            const contentString = workshop.fields.content.replace(/'/g, '"');
            try {
              const contentJson = JSON.parse(contentString);
              workshop.fields.content = contentJson;
            } catch (e) {
              console.error('Error parsing content JSON', e);
              workshop.fields.content = {};
            }
            return workshop;
          });
          setState(prevState => ({ ...prevState, workShop: updatedWorkshops }));
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

    instructors(
      (response) => {
        const filteredInstructors = response.data.filter(instructor => instructor.workshop === name);
        setState(prevState => ({ ...prevState, instructorData: filteredInstructors || [] }));
      },
      (error) => {
        console.log(error);
      }
    );
  }, [name]);

  useEffect(() => {
    if (token) {
      userRegistrations(username,
        (response) => {
          setState(prevState => ({ ...prevState, registeredWorkshops: response.data }));
        },
        (error) => {
          console.log(error.message);
        }
      );
    }

    Tob5(name,
      (response) => {
        setState(prevState => ({ ...prevState, Tob5Data: response['data'] }));
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }, [name, token, username]);

  const firstThree = useMemo(() => Tob5Data.slice(0, 3), [Tob5Data]);
  const lastTwo = useMemo(() => Tob5Data.slice(3, 5), [Tob5Data]);

  const onClickToRegisterWs = useCallback((nameOfWS) => {
    if (!token) {
      navigate("/login", {
        state: {
          previousUrl: location.pathname + location.search
        }
      });
    } else {
      registerWorkShop(token, nameOfWS, "register",
        (response) => {
          setState(prevState => ({ ...prevState, registeredWorkshops: [...prevState.registeredWorkshops, { pk: nameOfWS, status: "register" }] }));
          notify();
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    }
  }, [token, navigate, notify]);

  const isRegistered = useCallback((nameOfWS) => {
    return registeredWorkshops.some(ws => ws.pk === nameOfWS && (ws.status === 'register' || ws.status === 'taking'));
  }, [registeredWorkshops]);

  return (
    <>
      <PreLoader />
      <div className="body">
        <div className="logoLayout">
          <Link to="/">
            <img src={Logolayout} alt="Logo" />
          </Link>
        </div>
        <div className="workshop_details">
          {workShop.map(w => (
            <div className="Img_section" key={w.id}>
              <div className="col-1">
                <ImageEncode imageUrl={w.fields.logo} />
              </div>
              {/* <div className="col-2">
                <img src={img1} alt="Image" loading="lazy" />
                <img src={img3} alt="Image" loading="lazy" />
              </div> */}
            </div>
          ))}

          {workShop.map((w) => (
            <div className="ws_sections" key={w.pk}>
              <div className="ws_section_details">
                <div className="ws_section_title">
                  <h1>{`${w.pk} WorkShop`}</h1>
                  <p>{w.fields.description}</p>
                </div>
                <div className="main_details">
                  <p>Start day: <span>{w.fields.start_date}</span></p>
                  <p>End day: <span>{`${(new Date(w.fields.start_date) > today || w.fields.availability  ? w.fields.end_data : "--")}`}</span></p>
                  <p>Price: <span>{`${(new Date(w.fields.start_date) > today || w.fields.availability  ? w.fields.price === 0 ? "Free" : w.fields.price + ' EG' : "--")}`}</span></p>
                  <p>Location: <a href={w.fields.location} target="_blank" ><span>Click here</span></a></p>
                </div>
                <div className="ws_details_section">
                  <span>Details</span>
                  <div className="instructors">
                    <div className="instructors_title">
                      <img src={dot} alt="image" width={6} /> 
                      <h1 onClick={addActive1} style={{cursor: 'pointer'}}>Instructors</h1>
                      <button className="btn_click">
                        <img
                          src={vector_down}
                          alt="image"
                          className="vec_down"
                          onClick={addActive1}
                          id="im"
                          width={16}
                        />
                      </button>
                    </div>
                    {btnState1 && (
                      <div className={`instructors_cards ${toggleClassCheck1}`} id="Cards">
                        {instructorData.map((instructor, i) => (
                          <div className="instructors_card" id="card" key={i}>
                             < ImageEncode imageUrl={instructor.phtot}/>
                            <h1 className="instructor_name">{instructor.name}</h1>
                            <Link to={`/userPage/${instructor.username}`}>
                              <button>More</button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="instructors">
                    <div className="instructors_title">
                      <img src={dot} alt="image" width={6} /> 
                      <h1 onClick={addActive2} style={{cursor: 'pointer'}}>Contents</h1>
                      <button className="btn_click">
                        <img
                          src={vector_down}
                          alt="image"
                          className="vec_down"
                          onClick={addActive2}
                          id="im"
                          width={16}
                        />
                      </button>
                    </div>
                    {btnState2 && w.fields.content && (
                      <div className={`instructors_cards ${toggleClassCheck2}`} id="Cards">
                        <div className="card_container">
                          <div className="content_card">
                            {Object.entries(w.fields.content).map(([key, values]) => (
                              <div className="Session" key={key}>
                                <h1 className="num_of_se">{key}</h1>
                                <div className="Session_details">
                                  {values.map((detail, index) => (
                                    <p key={index}>
                                      <img src={dot} alt="image" />
                                      {detail}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="Register_WS">
                  {isRegistered(w.pk) ?
                    <Link>
                      <button className='btn-op registered' disabled> Registered </button>
                    </Link>
                    :
                    (new Date(w.fields.start_date) > today || w.fields.availability  ? 
                    <Link onClick={() => onClickToRegisterWs(w.pk)}>
                    <button className="btn-op"> Register </button>
                  </Link> 
                  : 
                  <button className="btn-op disabled" disabled> Passed </button>
                  )
                  }
                </div>
              </div>
              <div className="ws_section_tob5">
                <div className="tob5_title">
                  <h1>TOP 5</h1>
                </div>
                {Tob5Data.length === 0 ? (
                  <p className="empty_tob5_data">Strive to be one of the top 5<br />who reach for the Star✨</p>
                ) : (
                  <>
                    <div className="first_3">
                      {firstThree.map((user, i) => (
                        <div className="img_card" key={i}>
                          < ImageEncode imageUrl={user.photo} className="img_one" />
                          <p className="name">{user.name}</p>
                        </div>
                      ))}
                    </div>
                    <div className="last_2">
                      {lastTwo.map((user, i) => (
                        <div className="img_card" key={i}>
                          < ImageEncode imageUrl={user.photo} className="img_one" />
                          <p className="name">{user.name}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default WS_details;
