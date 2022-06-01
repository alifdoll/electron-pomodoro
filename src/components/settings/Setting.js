import React, { useContext } from "react";
import SettingContext from "./SettingContext";

const Setting = ({ setting }) => {
  const context = useContext(SettingContext);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <label>Work : {context.work} minutes</label>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <input
              id="work"
              variant="primary"
              type="range"
              min={1}
              max={120}
              value={context.work}
              onChange={(val) => context.setWork(val.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <label>Break : {context.shortRest} minutes</label>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <input
              id="break"
              variant="primary"
              type="range"
              min={5}
              max={15}
              value={context.rest}
              onChange={(val) => context.setRest(val.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button className="settings" onClick={() => setting(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
