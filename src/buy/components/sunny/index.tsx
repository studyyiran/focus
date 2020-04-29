import React, { useContext } from "react";
import "./index.less";

import { useEffect } from "react";
import { UserSunnyContext } from "../../pages/focus/context/sunny";

interface IUserSunny {}

export const UserSunny: React.FC<IUserSunny> = props => {
  const userSunnyContext = useContext(UserSunnyContext);
  const { UserSunnyContextValue, getUserSunny } = userSunnyContext;
  const {userSunny} = UserSunnyContextValue;
  useEffect(() => {
    getUserSunny();
  });
  return <div className="user-sunny">userSunny: {userSunny}</div>;
};
