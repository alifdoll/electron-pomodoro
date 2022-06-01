import React, { useContext, useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SettingButton from "../settings/SettingButton";
import SettingContext from "../settings/SettingContext";
import Counter from "./Counter";
import Pause from "./Pause";
import Play from "./Play";

const red = "#FF0000";
const green = "#00FF00";

const notifSound = require("../../assets/notif.mp3");
const sound = new Audio(notifSound);

const tickVal = 1000; // ubah untuk mengubah kecepatan timer

const Timer = ({ setting }) => {
  const context = useContext(SettingContext);
  const ModeEnum = {
    Work: context.work,
    Break: context.shortRest,
    Rest: context.longRest,
  };

  const [isRun, setIsRun] = useState(false);
  const [session, setSession] = useState(1);

  const [secondsLeft, setSecondsLeft] = useState(ModeEnum.Work * 60);
  const [currentMode, setCurrentMode] = useState(ModeEnum.Work);

  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(currentMode);
  const runRef = useRef(isRun);
  const sessionRef = useRef(session);

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  useEffect(() => {
    const change = () => {
      sound.play();
      const nextMode =
        sessionRef.current >= 4
          ? ModeEnum.Rest
          : modeRef.current === ModeEnum.Work
          ? ModeEnum.Break
          : ModeEnum.Work;

      modeRef.current = nextMode;
      setCurrentMode(nextMode);

      secondsLeftRef.current = nextMode * 60;
      setSecondsLeft(secondsLeftRef.current);

      if (modeRef.current === ModeEnum.Work || sessionRef.current == 4) {
        sessionRef.current++;
        setSession(sessionRef.current);
        console.log(modeRef.current);
      }
    };

    const setToDefault = () => {
      modeRef.current = ModeEnum.Work;
      setCurrentMode(modeRef.current);

      secondsLeftRef.current = modeRef.current * 60;
      setSecondsLeft(modeRef.current * 60);

      sessionRef.current = 1;
      setSession(1);
    };

    const pomodoro = setInterval(() => {
      if (!runRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0 && modeRef.current === ModeEnum.Rest) {
        runRef.current = false;
        setIsRun(runRef.current);

        setToDefault();
        return;
      }

      if (secondsLeftRef.current === 0) {
        return change();
      }
      tick();
    }, tickVal);

    return () => clearInterval(pomodoro);
  }, [context]);

  const totalSeconds = currentMode * 60;
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  return (
    <>
      <div className="container">
        <div className="flex-counter">
          <Counter session={session} base={0} offset={2} />
          <Counter session={session} base={1} offset={3} />
          <Counter session={session} base={2} offset={4} />
          <Counter session={session} base={3} offset={5} />
        </div>

        <div className="counter">
          <CircularProgressbar
            value={percentage}
            text={minutes + ":" + seconds}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: currentMode === ModeEnum.Work ? red : green,
              trailColor: "rgba(255,255,255,.2)",
            })}
          />
        </div>

        <div className="btn">
          {isRun ? (
            <Pause
              onClick={() => {
                setIsRun(false);
                runRef.current = false;
              }}
            />
          ) : (
            <Play
              onClick={() => {
                setIsRun(true);
                runRef.current = true;
              }}
            />
          )}
        </div>

        <div className="btn">
          <SettingButton setting={setting} />
        </div>
      </div>
    </>
  );
};

export default Timer;
