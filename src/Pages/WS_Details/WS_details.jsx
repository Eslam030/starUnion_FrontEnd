import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PreLoader from '../../Components/Loading/PreLoader';
import { DOMAIN } from "../../Api/config";
import { workShopDetails, instructors, Tob5 } from "../../Api/Endpoints/AppEndPoints"; // api
// Images
import Logolayout from "../../assets/star_logo.png";
import img1 from "../../assets/Image1.png"
import img2 from "../../assets/Image2.png";
import img3 from "../../assets/Image.png";
import user_one from "../../assets/User_img1.png";
import user_two from "../../assets/User_img2.png";
import dot from "../../assets/Ellipse.png";
import vector_down from "../../assets/Polygon.png";
// CSS file
import "./WS_details.css";



const WS_details = () => {
  const { name } = useParams();
  const [btnState1, setBtnState1] = useState(false);
  const [btnState2, setBtnState2] = useState(false);
  const [workShop, setWorkShop] = useState([]);
  const [instructorData, setInstructorData] = useState([]);

  function addActive1() {
    setBtnState1((btnState1) => !btnState1);
  }

  function addActive2() {
    setBtnState2((btnState2) => !btnState2);
  }

  let toggleClassCheck1 = btnState1 ? "active" : null;
  let toggleClassCheck2 = btnState2 ? "active" : null;


    useEffect(() => {
      workShopDetails(name, 
        (response) => {
          if (response.data) {
            const updatedWorkshops = response.data.map(workshop => {
              // Attempt to fix and parse the content JSON string
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
            setWorkShop(updatedWorkshops);
          }
        },
        (error) => {
            console.error('Error fetching events:', error);
        }
    );

    //*instructors
    instructors(
      (response) => {
          const filteredInstructors = response.data.filter(instructor => instructor.workshop === name);
          setInstructorData(filteredInstructors || []);
      },
      (error) => {
        console.log(error)
      }
    )

  //* Top 5
  // Tob5(test, 
  //   (response) => {
  //       console.log(response['message']) 
  //       for (let i = 0 ; i < response['data'].length ; i ++) {
  //         // getting logo
  //         console.log(response['data'][i])
  //       }
  //   },
  //   (error) => {
  //     console.log(error)
  //   }
  // ) 
    },[])

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
            <img src={`${DOMAIN}/main/getImage?path=${w.fields.logo}`} alt="Workshop Image" />
          </div>
          <div className="col-2">
            <img src={img1} alt="Image" />
            <img src={img3} alt="Image" />
          </div>
        </div>
        ))}

        
        {workShop.map((w) => (

        <div className="ws_sections">
          <div className="ws_section_details">
            <div className="ws_section_title">
              <h1>{`${w.pk} WorkShop`}</h1>
              <p>{w.fields.description}</p>
            </div>
            <div className="main_details">
              <p>Start day: <span>{w.fields.start_date}</span></p>
              <p>End day: <span>{w.fields.end_date}</span></p>
              <p>Price: <span>{`${w.fields.price == 0 ? "Free" : w.fields.price + ' EG'}`}</span> </p>
              <p>Location: <span>{w.fields.location}</span></p>
            </div>
            <div className="ws_details_section">
              <span>Details</span>
              {/* <img src={vector_down} alt="Vector" /> */}
              <div className="instructors">
                <div className="instructors_title">
                  <img src={dot} alt="image" /> <h1>Instructors</h1>
                  <button className="btn_click">
                    {" "}
                    <img
                      src={vector_down}
                      alt="image"
                      className="vec_down"
                      onClick={addActive1}
                      id="im"
                    />
                  </button>
                </div>
                {btnState1 && (

                <div className={`instructors_cards ${toggleClassCheck1}`} id="Cards">
                  
                  {instructorData.map((instructor, i) => (
                    <div className="instructors_card" id="card" key={i}>
                      <img src={user_two} alt="Instructor" />
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
                  <img src={dot} alt="image" /> <h1>Contents</h1>
                  <button className="btn_click">
                    {" "}
                    <img
                      src={vector_down}
                      alt="image"
                      className="vec_down"
                      onClick={addActive2}
                      id="im"
                    />
                  </button>
                </div>
 
                {btnState2 && w.fields.content && (

                    <div className={`instructors_cards ${toggleClassCheck2}`} id="Cards">
                      <div className="card_container">
                        <div className="content_card" >
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
          </div>

          <div className="ws_section_tob5">
            <div className="tob5_title">
              <h1>TOB 5</h1>
            </div>

            <div className="first_3">
              <div className="img_card">
                <img src={user_two} alt="User" />
                <p className="name">Harry Potter</p>
              </div>

              <div className="img_card">
                <img src={user_one} alt="User" className="img_one" />
                <p className="name">Luna</p>
              </div>

              <div className="img_card">
                <img src={user_two} alt="User" />
                <p className="name">Harry Potter</p>
              </div>
            </div>

            <div className="last_2">
              <div className="img_card">
                <img src={user_two} alt="User" />
                <p className="name">Harry Potter</p>
              </div>

              <div className="img_card">
                <img src={user_one} alt="User" className="img_one" />
                <p className="name">Luna</p>
              </div>
            </div>
          </div>
        </div>

        ))}

        
      </div>
      </div>
    </>
  );
};

export default WS_details;
