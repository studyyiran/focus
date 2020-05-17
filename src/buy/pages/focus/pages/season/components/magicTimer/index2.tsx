import React, { useEffect, useReducer, useRef } from "react";
import "./index.less";
import { MyTimer } from "../../../../../../common/utils/timer";

interface IMagicTimer {
  currentTime: number;
}

const reducer = (state: any, action: any) => {
  const { type, value } = action;
  switch (type) {
    case "setStatus":
      state.status = value;
      break;
    case "setCurrentTime":
      state.currentTime = value;
      break;
    case "setCurrentTarget":
      state.currentTarget = value;
      break;
  }
  return { ...state };
};

export const MagicTimer2: React.FC<IMagicTimer> = props => {
  const { currentTime } = props;
  const initState = {
    currentTime: 0
  };
  const [state, dispatch] = useReducer(reducer, initState);
  let timerRef = useRef({} as any);

  useEffect(() => {
    newTimer(currentTime);
    return () => {
      if (timerRef && timerRef.current && timerRef.current.stop) {
        timerRef.current.stop();
      }
    };
  }, [currentTime]);

  function newTimer(time: number, finishCallBack?: any) {
    const info = {
      time: time,
      onlyStartTime: time,
      minInterval: time > 0 ? -1000 : 1000,
      runCallBack: (times: any, timeSecond: any) => {
        dispatch({
          type: "setCurrentTime",
          value: timeSecond
        });
      },
      finishCallBack: () => {
        timerRef.current.stop();
        newTimer(0)
      }
    };
    // @ts-ignore
    timerRef.current = new MyTimer(info);
    timerRef.current.start();
  }
  return (
    <div className="magic-timer">
      <span>{timerRef.current && timerRef.current.format && timerRef.current.format(state.currentTime).join(":")}</span>
    </div>
  );
};
