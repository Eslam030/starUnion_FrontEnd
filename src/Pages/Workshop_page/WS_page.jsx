import "./WS_page.css";
import { Link } from "react-router-dom";
import Logolayout from "../../assets/star_logo.png";
import WS_img from "../../assets/Image1.png";
import vector_down from "../../assets/Vector-down.png";
const WS_page = () => {
  return (
    <>
      <div className="logoLayout">
        <Link to="/">
          <img src={Logolayout} alt="Logo" />
        </Link>
      </div>

      <div className="workshop_container">
        <div className="section_title">
          <div className="section_name">
            <h1>Upcoming Workshops</h1>
          </div>

          <div className="section_btn">
            <button className="sec_btn_for_days">
              Weekdays <img src={vector_down} alt="vector_down" />
            </button>
            <button className="sec_btn_for_types">
              Workshop Type
              <img src={vector_down} alt="vector_down" />
            </button>
          </div>
        </div>

        <div className="workshop_cards">
          <div className="workshop_card">
            <div className="workshop_card_img">
              <img src={WS_img} alt="Workshop" />
            </div>
            <div className="workshop_card_content">
              <div className="workshop_date">
                <span className="month">APR</span>
                <p className="day">14</p>
              </div>
              <div className="workshop_card_title">
                <h1>Web Development and Web Design</h1>
                <p className="workshop_card_description">
                  We’ll get you directly seated and inside for you to enjoy the
                  show.
                </p>
              </div>
            </div>
          </div>

          <div className="workshop_card">
            <div className="workshop_card_img">
              <img src={WS_img} alt="Workshop" />
            </div>
            <div className="workshop_card_content">
              <div className="workshop_date">
                <span className="month">AUG</span>
                <p className="day">20</p>
              </div>
              <div className="workshop_card_title">
                <h1>Web Development and Web Design</h1>
                <p className="workshop_card_description">
                  We’ll get you directly seated and inside for you to enjoy the
                  show.
                </p>
              </div>
            </div>
          </div>

          <div className="workshop_card">
            <div className="workshop_card_img">
              <img src={WS_img} alt="Workshop" />
            </div>
            <div className="workshop_card_content">
              <div className="workshop_date">
                <span className="month">SEP</span>
                <p className="day">18</p>
              </div>
              <div className="workshop_card_title">
                <h1>Web Development and Web Design</h1>
                <p className="workshop_card_description">
                  We’ll get you directly seated and inside for you to enjoy the
                  show.
                </p>
              </div>
            </div>
          </div>

          <div className="workshop_card">
            <div className="workshop_card_img">
              <img src={WS_img} alt="Workshop" />
            </div>
            <div className="workshop_card_content">
              <div className="workshop_date">
                <span className="month">APR</span>
                <p className="day">14</p>
              </div>
              <div className="workshop_card_title">
                <h1>Web Development and Web Design</h1>
                <p className="workshop_card_description">
                  We’ll get you directly seated and inside for you to enjoy the
                  show.
                </p>
              </div>
            </div>
          </div>

          <div className="workshop_card">
            <div className="workshop_card_img">
              <img src={WS_img} alt="Workshop" />
            </div>
            <div className="workshop_card_content">
              <div className="workshop_date">
                <span className="month">APR</span>
                <p className="day">27</p>
              </div>
              <div className="workshop_card_title">
                <h1>Web Development and Web Design</h1>
                <p className="workshop_card_description">
                  We’ll get you directly seated and inside for you to enjoy the
                  show.
                </p>
              </div>
            </div>
          </div>

          <div className="workshop_card">
            <div className="workshop_card_img">
              <img src={WS_img} alt="Workshop" />
            </div>
            <div className="workshop_card_content">
              <div className="workshop_date">
                <span className="month">NOV</span>
                <p className="day">9</p>
              </div>
              <div className="workshop_card_title">
                <h1>Web Development and Web Design</h1>
                <p className="workshop_card_description">
                  We’ll get you directly seated and inside for you to enjoy the
                  show.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="sec_btn_For_More">
          <button>Load More</button>
        </div>
      </div>
    </>
  );
};

export default WS_page;
