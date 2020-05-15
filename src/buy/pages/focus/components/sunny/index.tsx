import React, { useContext } from "react";
import "./index.less";

import { useEffect } from "react";
import { UserSunnyContext } from "../../context/sunny";
import { Progress } from "../progress";

interface IUserSunny {}

export const UserSunny: React.FC<IUserSunny> = props => {
  const userSunnyContext = useContext(UserSunnyContext);
  const { UserSunnyContextValue, loginSunny } = userSunnyContext;
  const { userSunny } = UserSunnyContextValue;
  const { continueLoginInfo } = userSunny;
  if (continueLoginInfo) {
    const {isLoginToday, level} = continueLoginInfo
    const RenderLoginButton = () => {
      if (continueLoginInfo) {
        if (isLoginToday) {
          // @ts-ignore
          // return <button>have got{level * 10} today!</button>;
          return null
        } else {
          // @ts-ignore
          const nextLevel = (level + 1) * 10
          return <button onClick={() => {
            loginSunny()
          }}>get {nextLevel} today！</button>;
        }
      } else {
        return null
      }
    };

    return (
      <div className="user-sunny">
        {RenderLoginButton()}
        {isLoginToday ? <img src={require('./res/icon_4.png')} /> : null}
      </div>
    );
  } else {
    return null;
  }
};
