import React, { useState } from "react";

const Pomodoro = () => {
  const miliMinute = 60000;

  const defaultConfiguration = {
    pomodoroDuration: 25,
    breakDuration: 5,
  };

  const [isPomodoro, setIsPomodoro] = useState(true);
  const [configuration, setConfiguration] = useState(defaultConfiguration);
  const [minutes, setMinutes] = useState(configuration.pomodoroDuration);
  const [seconds, setSeconds] = useState(0);
  const [buttonStatus, setButtonStatus] = useState({
    startButton: false,
    stopButton: true,
  });
  const [intervals] = useState({
    pomodoroInterval: "",
    breakInterval: "",
    secondsInterval: "",
    firstBreakTimeOut: "",
    secondPomodoroTimeOut: "",
    globalStopTimeOut: "",
  });

  const startPomodoro = () => {
    setTimeout(() => {
      setMinutes(configuration.pomodoroDuration - 1);
    }, 1000);
    intervals.pomodoroInterval = setInterval(() => {
      setMinutes((prevMinutes) => {
        return !prevMinutes
          ? configuration.pomodoroDuration - 1
          : prevMinutes - 1;
      });
    }, miliMinute);
  };

  const startBreak = () => {
    setTimeout(() => {
      setMinutes(configuration.breakDuration - 1);
    }, 1000);
    intervals.breakInterval = setInterval(() => {
      setMinutes((prevMinutes) => {
        return !prevMinutes ? configuration.breakDuration - 1 : prevMinutes - 1;
      });
    }, miliMinute);
  };

  const getSeconds = () => {
    setTimeout(() => {
      setSeconds(0);
    }, 1000);
    intervals.secondsInterval = setInterval(() => {
      setSeconds((prevSecond) => {
        return !prevSecond ? 59 : prevSecond - 1;
      });
    }, 1000);
  };

  const togglePomodoro = () => {
    setIsPomodoro((prevIsPomodoro) => !prevIsPomodoro);
  };

  const firstBreakAfter = (duration) => {
    intervals.firstBreakTimeOut = setTimeout(() => {
      togglePomodoro();
      clearInterval(intervals.pomodoroInterval);
      setMinutes(configuration.breakDuration);
      startBreak();
      console.log("Break");
    }, duration * miliMinute);
  };

  const secondPomodoro = (duration) => {
    intervals.secondPomodoroTimeOut = setTimeout(() => {
      togglePomodoro();
      clearInterval(intervals.breakInterval);
      setMinutes(configuration.pomodoroDuration);
      startPomodoro();
      console.log("second pomodoro");
    }, (duration + configuration.pomodoroDuration) * miliMinute);
  };

  const stopGlobal = () => {
    const total =
      2 * configuration.pomodoroDuration + configuration.breakDuration;
    intervals.globalStopTimeOut = setTimeout(() => {
      stopSession();
    }, total * miliMinute);
  };

  const toggleButtons = () => {
    setButtonStatus((prevButtonStatus) => {
      return {
        startButton: !prevButtonStatus.startButton,
        stopButton: !prevButtonStatus.stopButton,
      };
    });
  };

  const startSession = () => {
    console.log(`pomodoro: ${isPomodoro}`);
    console.log(configuration);
    console.log(intervals);

    //Start Pomodoro
    //Set the first break
    firstBreakAfter(configuration.pomodoroDuration);

    //Set the second pomodoro
    secondPomodoro(configuration.breakDuration);

    //Starts first pomodoro session
    startPomodoro();

    //set seconds
    getSeconds();

    //Disable/enable buttons
    toggleButtons();

    //Set global stop
    stopGlobal();
  };

  const stopSession = () => {
    console.log(intervals);
    const {
      pomodoroInterval,
      breakInterval,
      secondsInterval,
      firstBreakTimeOut,
      secondPomodoroTimeOut,
      globalStopTimeOut,
    } = intervals;
    clearInterval(pomodoroInterval);
    clearInterval(breakInterval);
    clearInterval(secondsInterval);

    clearTimeout(firstBreakTimeOut);
    clearTimeout(secondPomodoroTimeOut);
    clearTimeout(globalStopTimeOut);

    setMinutes(configuration.pomodoroDuration);
    setSeconds(0);
    setIsPomodoro(true);
    toggleButtons();
  };

  const handlePomodoroConfigChange = (e) =>
    setConfiguration((prevConfiguraton) => ({
      ...prevConfiguraton,
      pomodoroDuration: e.target.value,
    }));

  const handleBreakConfigChange = (e) =>
    setConfiguration((prevConfiguraton) => ({
      ...prevConfiguraton,
      breakDuration: e.target.value,
    }));

  const handleConfigurationChange = () => {
    //Check if one of the inputs is not a number
    const { pomodoroDuration, breakDuration } = configuration;
    const newPomodoroDuration = parseInt(pomodoroDuration);
    const newBreakDuration = parseInt(breakDuration);

    if (isNaN(newPomodoroDuration) || isNaN(newBreakDuration)) {
      alert("Unable to parse string to integer");
      return;
    }

    const newConfiguration = {
      pomodoroDuration: newPomodoroDuration,
      breakDuration: newBreakDuration,
    };

    setConfiguration(newConfiguration);
    setMinutes(newPomodoroDuration);
  };

  return (
    <>
      <div className="counter-container">
        <div className="circle">
          <div className="counter">
            {minutes.toString().length > 1 ? minutes : `0${minutes}`}:
            {seconds.toString().length > 1 ? seconds : `0${seconds}`}
          </div>
        </div>
      </div>
      <div className="status">{isPomodoro ? "Focusing" : "Take a break"}</div>
      <div className="pomodoro-buttons">
        <button
          className="pomodoro-btn"
          onClick={startSession}
          disabled={buttonStatus.startButton}
        >
          Start Session
        </button>
        <button
          className="pomodoro-btn"
          onClick={stopSession}
          disabled={buttonStatus.stopButton}
        >
          Stop Session
        </button>
      </div>
      <div>
        <div className="pomodoro-form">
          <span className="col-half">
            <label htmlFor="pomodoroDuration" className="label">
              Pomodoro Duration
            </label>
            <input
              className="custom-input input-2"
              name="pomodoroDuration"
              type="text"
              placeholder="25"
              value={configuration.pomodoroDuration}
              onChange={(e) => handlePomodoroConfigChange(e)}
            />
          </span>

          <span className="col-half">
            <label htmlFor="pomodoroDuration" className="label">
              Break Duration
            </label>
            <input
              className="custom-input input-2"
              name="breakDuration"
              type="text"
              placeholder="5"
              value={configuration.breakDuration}
              onChange={(e) => handleBreakConfigChange(e)}
            />
          </span>
        </div>
        <span className="col-half">
          <button
            className="pomodoro-btn-2"
            onClick={handleConfigurationChange}
          >
            Set Session
          </button>
        </span>
      </div>
    </>
  );
};

export default Pomodoro;
