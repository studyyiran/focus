import React, { useContext } from "react";
import "./index.less";

import { useEffect } from "react";
import { UserSunnyContext } from "../../pages/focus/context/sunny";

interface IUserSunny {}

export const UserSunny: React.FC<IUserSunny> = props => {
  const userSunnyContext = useContext(UserSunnyContext);
  const { UserSunnyContextValue, getUserSunny } = userSunnyContext;
  const { userSunny } = UserSunnyContextValue;

  useEffect(() => {
    getUserSunny();
  }, [getUserSunny]);

  if (userSunny) {
    const { continueLoginInfo } = userSunny;
    const RenderLoginButton = () => {
      if (continueLoginInfo) {
        const {isLoginToday, level} = continueLoginInfo
        if (isLoginToday) {
          // @ts-ignore
          return <button>have got{level * 10} today!</button>;
        } else {
          // @ts-ignore
          const nextLevel = (level + 1) * 10
          return <button>get {nextLevel} today！</button>;
        }
      } else {
        return null
      }
    };

    return (
      <div className="user-sunny">
        <span> userSunny: {userSunny && userSunny.sunnyCount}</span>
        <span>{RenderLoginButton()}</span>
      </div>
    );
  } else {
    return null;
  }
};
