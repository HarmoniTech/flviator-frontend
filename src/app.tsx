import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import Header from "./components/Header";
import BetsUsers from "./components/BetUsers";
import Main from "./components/Main";

import MainAudio from "./assets/audio/main.wav";
import FlewAwayAudio from "./assets/audio/flew_away.mp3";
import TakeOffAudio from "./assets/audio/take_off.mp3";

import propeller from "./assets/images/propeller.png";

import Context from "./context";
import PerfectLiveChat from "./components/Chat";

function App() {
  const {
    state,
    msgTab,
    platformLoading,
    errorBackend,
    // unityLoading,
    // currentProgress,
    unityState,
    GameState,
  } = React.useContext(Context);
  const return_url = new URLSearchParams(useLocation().search).get(
    "return_url"
  );

  const mainAudioRef = useRef<HTMLAudioElement>(null);
  const takeOffAudioRef = useRef<HTMLAudioElement>(null);
  const flewAwayAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (
      GameState === "PLAYING" &&
      unityState === true &&
      state.userInfo.isSoundEnable === true
    ) {
      if (takeOffAudioRef.current) {
        try {
          takeOffAudioRef.current.play();
        } catch (error) { }
      }

    }
    // eslint-disable-next-line
  }, [takeOffAudioRef, GameState, state.userInfo.isSoundEnable]);

  useEffect(() => {
    if (
      GameState === "GAMEEND" &&
      unityState === true &&
      state.userInfo.isSoundEnable === true
    ) {
      if (flewAwayAudioRef.current) {
        try {
          flewAwayAudioRef.current.play();
        } catch (error) { }
      }
    }
    // eslint-disable-next-line
  }, [flewAwayAudioRef.current, GameState, state.userInfo.isSoundEnable]);

  return (
    <div className="main-container">
      <div style={{ display: "none" }}>
        {/* Main Audio Section */}
        <audio id="mainAudio" ref={mainAudioRef} loop>
          <source src={MainAudio} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>

        {/* Take Off Audio Section */}
        <audio id="takeOffAudio" ref={takeOffAudioRef}>
          <source src={TakeOffAudio} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        {/* Flew Away Audio Section */}
        <audio id="flewAwayAudio" ref={flewAwayAudioRef}>
          <source src={FlewAwayAudio} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {platformLoading && (
        <div className="platformmyloading">
          <div className="loading-container">
            <div className="rotation">
              <img alt="propeller" src={propeller}></img>
            </div>
            {errorBackend === true ? (
              <div className="waiting-font">{return_url}</div>
            ) : (
              <div className="waiting-font">WAITING FOR LOADING IN BACKEND</div>
            )}
          </div>
        </div>
      )}
      {/* {!platformLoading && !unityLoading && (
        <div className="myloading">
          <div className="loading-container">
            <div className="rotation">
              <img alt="propeller" src={propeller}></img>
            </div>
            <div className="waiting">
              <div
                style={{ width: `${currentProgress * 1.111 + 0.01}%` }}
              ></div>
            </div>
            <p>{Number(currentProgress * 1.111 + 0.01).toFixed(2)}%</p>
          </div>
        </div>
      )} */}
      <div className="contianer">
        <div className="main-game-container">
          <div className="game-container">
            <Header />
            <BetsUsers />
            <Main />
          </div>
        </div>
        {msgTab && <PerfectLiveChat />}
      </div>
    </div>
  );
}

export default App;
