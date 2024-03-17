import { Link } from "react-router-dom";
import { useState } from "react";
import Logolayout from "../../assets/star_logo.png";
import img1 from "../../assets/Image1.png";
import img2 from "../../assets/Image2.png";
import img3 from "../../assets/Image.png";
import user_one from "../../assets/User_img1.png";
import user_two from "../../assets/User_img2.png";
import dot from "../../assets/Ellipse.png";
import vector_down from "../../assets/Polygon.png";
import "./WS_details.css";

const WS_details = () => {
  const [btnState1, setBtnState1] = useState(false);
  const [btnState2, setBtnState2] = useState(false);

  function addActive1() {
    setBtnState1((btnState1) => !btnState1);
  }

  function addActive2() {
    setBtnState2((btnState2) => !btnState2);
  }

  let toggleClassCheck1 = btnState1 ? "active" : null;
  let toggleClassCheck2 = btnState2 ? "active" : null;

  return (
    <>
      <div className="logoLayout">
        <Link to="/">
          <img src={Logolayout} alt="Logo" />
        </Link>
      </div>
      <div className="workshop_details">
        <div className="Img_section">
          <div className="col-1">
            <img src={img2} alt="Image" />
          </div>
          <div className="col-2">
            <img src={img1} alt="Image" />
            <img src={img3} alt="Image" />
          </div>
        </div>

        <div className="ws_sections">
          <div className="ws_section_details">
            <div className="ws_section_title">
              <h1>Interactive Workshop</h1>
              <p>Up your skills to advance your career path </p>
            </div>

            <div className="ws_details_section">
              <span>Details</span>
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
                <div
                  className={`instructors_cards ${toggleClassCheck1}`}
                  id="Cards"
                >
                  <div className="instructors_card" id="card">
                    <img src={user_two} alt="" />
                    <h1 className="instructor_name">Kiro Adel</h1>
                    <Link to="/userPage">
                      <button>More</button>
                    </Link>
                  </div>

                  <div className="instructors_card" id="card">
                    <img src={user_two} alt="" />
                    <h1 className="instructor_name">Kiro Adel</h1>
                    <Link to="/userPage">
                      <button>More</button>
                    </Link>
                  </div>

                  <div className="instructors_card" id="card">
                    <img src={user_two} alt="" />
                    <h1 className="instructor_name">Kiro Adel</h1>
                    <Link to="/userPage">
                      <button>More</button>
                    </Link>
                  </div>
                </div>
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
                <div
                  className={`instructors_cards ${toggleClassCheck2}`}
                  id="Cards"
                >
                  <div className="content_card">
                    <div className="Session">
                      <h1 className="num_of_se">First Session</h1>
                      <div className="Session_details">
                        <p>
                          <img src={dot} alt="image" />
                          What is programming?
                        </p>
                        <p>
                          <img src={dot} alt="image" />
                          Datatypes
                        </p>
                        <p>
                          <img src={dot} alt="image" />
                          Input / Output
                        </p>
                        <p>
                          <img src={dot} alt="image" />
                          Arithmetic Operations
                        </p>
                      </div>
                    </div>

                    <div className="Session">
                      <h1 className="num_of_se">Second Session</h1>
                      <div className="Session_details">
                        <p>
                          <img src={dot} alt="image" />
                          Conditions
                        </p>
                        <p>
                          <img src={dot} alt="image" />
                          Loops
                        </p>
                        <p>
                          <img src={dot} alt="image" />
                          Switches
                        </p>
                        <p>
                          <img src={dot} alt="image" />
                          Arrays
                        </p>
                      </div>
                    </div>

                    <div className="Session">
                      <h1 className="num_of_se">Third Session</h1>
                      <div className="Session_details">
                        <p>
                          <img src={dot} alt="image" />
                          Stls
                        </p>
                        <p>
                          <img src={dot} alt="image" />
                          Strings
                        </p>
                      </div>
                    </div>

                    <div className="Session last_session">
                      <h1 className="num_of_se">Forth Session</h1>
                      <div className="Session_details">
                        <p>
                          <img src={dot} alt="image" />
                          Functions
                        </p>
                        <p>
                          <img src={dot} alt="image" />
                          Recursion
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
      </div>
    </>
  );
};

export default WS_details;
