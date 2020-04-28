import React, { useRef, useState } from "react";
import "./index.less";
import { MyTimer } from "../../../../../../common/utils/timer";

interface IMagicTimer {}

const TIMERSTATUS = {
  STOP: "stop",
  DOING: "doing"
};

export const MagicTimer: React.FC<IMagicTimer> = props => {
  const [status, setStatus] = useState(TIMERSTATUS.STOP);
  let timerRef = useRef({} as any);
  const renderByStatus = () => {
    switch (status) {
      case TIMERSTATUS.STOP:
        return (
          <button
            onClick={() => {
              newTimer(25 * 1000 * 60);
              setStatus(TIMERSTATUS.DOING)
            }}
          >
            start!
          </button>
        );
      case TIMERSTATUS.DOING:
        return (
          <button
            onClick={() => {
              if (timerRef && timerRef.current && timerRef.current.stop) {
                timerRef.current.stop()
                setStatus(TIMERSTATUS.STOP)
              }

            }}
          >
            stop!
          </button>
        );
      default:
        return null;
    }
  };

  const newTimer = (time: Number, finishCallBack?: any) => {
    const info = {
      time: time,
      minInterval: -1000,
      runCallBack: (times: any) => {
        console.log(times);
      },
      finishCallBack: () => {
        // that.setState({
        //   times: []
        // });
      }
    };
    // @ts-ignore
    timerRef.current = new MyTimer(info);
    timerRef.current.start();
  };

  return <div className="magic-timer">
    {renderByStatus()}
  </div>;
};
