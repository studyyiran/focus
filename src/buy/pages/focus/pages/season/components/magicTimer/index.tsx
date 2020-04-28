import React, { useReducer, useRef, useState } from "react";
import "./index.less";
import { MyTimer } from "../../../../../../common/utils/timer";
import {seasonServer} from '../../server'
import { levelupModal } from "../../../targetPage/components/renderLevelUpButtons";

interface IMagicTimer {}

const TIMERSTATUS = {
  STOP: "stop",
  DOING: "doing",
  FINISH: "finish",
};

const reducer = (state: any, action: any) => {
  const {type, value} = action
  switch(type) {
    case 'setStatus':
      state.status = value
      break
    case 'setCurrentTime':
      state.currentTime = value
      break
  }
  return {...state}
}

export const MagicTimer: React.FC<IMagicTimer> = props => {
  const initState = {
    status: TIMERSTATUS.STOP,
    currentTime: 25 * 1000 * 60,
  }
  const [state, dispatch] = useReducer(reducer, initState)
  console.log(state)
  let timerRef = useRef({} as any);
  const renderByStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case TIMERSTATUS.STOP:
        return (
          <button
            onClick={() => {
              newTimer(state.currentTime);
              dispatch({
                type: 'setStatus',
                value: TIMERSTATUS.DOING
              })
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
                dispatch({
                  type: 'status',
                  value: TIMERSTATUS.STOP
                })
              }
            }}
          >
            stop!
          </button>
        );
      case TIMERSTATUS.FINISH:
        return (
          <button
            onClick={() => {
             // 填入时间。
              // 填入buff类型。
              // 进行记录。
              levelupModal("buffName", (info: any) => {
                seasonServer.addStudyBuffRecord({
                  type: info.buffName,
                  continueTime: 25 * 1000 * 60,
                })
              });
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
      runCallBack: (times: any, timeSecond: any) => {
        dispatch({
          type: 'setCurrentTime',
          value: timeSecond
        })
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
  console.log(MyTimer.prototype.format(state.currentTime))
  return <div className="magic-timer">
    {timerRef && timerRef.current && timerRef.current.format && timerRef.current.format(state.currentTime).join(':')}
    {renderByStatus(state.status)}
    {renderByStatus(TIMERSTATUS.FINISH)}
  </div>;
};
