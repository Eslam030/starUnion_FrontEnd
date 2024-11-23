// RegistrationSection.js
import React from 'react';

const RegistrationSection = ({ show, data, title, onClose, removeAction, type }) => {
  if (!show) return null;

  return (
    <div className="bk show">
      <div className="registerSection_container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className="close_img"
          onClick={onClose}
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
        <h2 className="model_title">{title}</h2>

        {data.length > 0 ? (
          data.map((item) => (
            <div className="registerSec_card" key={item.id}>
              <div className="UserRegisterData">
                <div className="WS_img">
                  <img src={`${DOMAIN}/main/getImage?path=${item.fields.logo}`} alt="" />
                </div>
                <div className="WS_details">
                  <p className="WS_pk">{item.pk} {type}</p>
                  <p className="WS_title">{item.fields.description}</p>

                  {item.status && (
                    <p className="WS_status">
                      Status:
                      <span className={item.status !== "register" && "accept"}>
                        {item.status === "register" ? (
                          <div className="status-msg">
                            Pending for accepting{" "}
                            <span className="dot-flashing"></span>
                          </div>
                        ) : (
                          "Accepted"
                        )}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              {item.status === "register" && removeAction && (
                <button className="remove" onClick={() => removeAction(item.pk)}>
                  X
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="noDataMessage">Not registered yet to any {type}!</div>
        )}
      </div>
    </div>
  );
};

export default RegistrationSection;
