import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import PreLoader from "../../Components/Loading/PreLoader";
import { workShopPages } from "../../Api/Endpoints/AppEndPoints"; // api
import ImageEncode from "../../Components/ImageComponents/ImageEncode";
// Images
import Logolayout from "../../assets/star_logo2.png";
import vector_down from "../../assets/Vector-down.png";
// CSS file
import "./WS_page.css";

const WS_page = () => {
  const [workShop, setWorkShops] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [WSFilter, setWS] = useState("all");
  const [WSName, setWSName] = useState("All");
  const [visibleWorkshops, setVisibleWorkshops] = useState(6);

  useEffect(() => {
    workShopPages(
      (response) => {
        if (response.data) {
          setWorkShops(response.data);
        }
      },
      (error) => {
        console.error("Error fetching workshops:", error);
      }
    );
  }, []);

  const today = new Date();

  const filteredWorkShop = useMemo(() => {
    return workShop.filter((w) => {
      const WSStartDate = new Date(w.fields.start_date);
      const WSEndDate = new Date(w.fields.end_date);
      switch (WSFilter) {
        case "PA":
          return WSEndDate < today;
        case "CW":
          return WSStartDate <= today && WSEndDate >= today;
        case "CM":
          return WSStartDate > today;
        case "all":
        default:
          return true;
      }
    });
  }, [workShop, WSFilter, today]);

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

  const loadMore = useCallback(() => {
    setVisibleWorkshops((prevVisibleWorkshops) => prevVisibleWorkshops + 6);
  }, []);

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
              <h1>{`${WSName} Workshops`}</h1>
            </div>
            <div className="section_btn">
              <div
                className="sec_btn_for_types"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <div className="type">
                  Workshop Type
                  <img src={vector_down} alt="vector_down" />
                </div>
                <div className={`options + ${isOpen ? "open" : "close"}`}>
                  <button
                    onClick={() => {
                      setWS("all");
                      setWSName("All");
                    }}
                  >
                    All WorkShops
                  </button>
                  <button
                    onClick={() => {
                      setWS("CM");
                      setWSName("Coming");
                    }}
                  >
                    Coming WorkShops
                  </button>
                  <button
                    onClick={() => {
                      setWS("CW");
                      setWSName("Current");
                    }}
                  >
                    Current WorkShops
                  </button>
                  <button
                    onClick={() => {
                      setWS("PA");
                      setWSName("Past");
                    }}
                  >
                    Past WorkShops
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="workshop_cards">
            {filteredWorkShop.length > 0 ? (
              filteredWorkShop.slice(0, visibleWorkshops).map((WS, index) => (
                <div className="workshop_card" key={index}>
                  <Link to={`/workshops/details/${WS.pk}`}>
                    <div className="workshop_card_img">
                      <ImageEncode imageUrl={WS.fields.logo} />
                    </div>
                    <div className="workshop_card_content">
                      <div className="workshop_date">
                        <span className="month">
                          {getMonthFromDate(WS.fields.start_date)}
                        </span>
                        <p className="day">
                          {getDayFromDate(WS.fields.start_date)}
                        </p>
                      </div>
                      <div className="workshop_card_title">
                        <h1>{WS.pk}</h1>
                        <p className="workshop_card_description">
                          {WS.fields.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="no_data">No Workshop Found!</p>
            )}
          </div>

          {visibleWorkshops < filteredWorkShop.length && (
            <div className="sec_btn_For_More">
              <button onClick={loadMore}>Load More</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WS_page;
