import * as React from "react";
import "./styles/App.css";
import Setting from "./components/settings/Setting.js";
import Timer from "./components/timer/Timer.js";
import { useState } from "react";
import SettingContext from "./components/settings/SettingContext.js";

function App() {
  const [showSetting, setshowSetting] = useState(false);
  const [work, setWork] = useState(25);
  const [shortRest, setShortRest] = useState(5);
  const [longRest, setLongRest] = useState(30);

  return (
    <>
      <SettingContext.Provider
        value={{
          work,
          shortRest,
          longRest,
          setWork,
          setShortRest,
          setLongRest,
        }}
      >
        {showSetting ? (
          <Setting setting={setshowSetting} />
        ) : (
          <Timer setting={setshowSetting} />
        )}
      </SettingContext.Provider>
    </>
  );
}

export default App;
