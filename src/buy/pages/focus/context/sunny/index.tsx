import React, { createContext, useReducer, useEffect } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import useReducerMiddleware from "buy/common/useHook/useReducerMiddleware";
import { IContextValue } from "buy/common/type";

import { IUserSunnyActions, useUserSunnyGetActions } from "./useGetActions";

export const UserSunnyContext = createContext({} as IUserSunnyContext);

// store name
export const UserSunny = "UserSunny";

interface IUserSunny {
  sunnyCount: Number;
  continueLoginInfo: {
    isLoginToday: Boolean;
    lastOneLoginDate: String;
    level: Number;
  };
}
// store state
export interface IUserSunnyState {
  userSunny: IUserSunny;
}

// interface
export interface IUserSunnyContext extends IUserSunnyActions, IContextValue {
  UserSunnyContextValue: IUserSunnyState;
  UserSunnyContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function UserSunnyContextProvider(props: any) {
  const initState: IUserSunnyState = {
    userSunny: {} as any
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IUserSunnyActions = useUserSunnyGetActions(state, dispatch);

  const propsValue: IUserSunnyContext = {
    ...action,
    UserSunnyContextValue: state,
    UserSunnyContextDispatch: dispatch
  };
  const { getUserSunny } = action;
  useEffect(() => {
    getUserSunny();
  }, [getUserSunny]);

  return <UserSunnyContext.Provider value={propsValue} {...props} />;


  // const isPage = useIsCurrentPage("/test");
  // @useEffect
  // useEffect(() => {
  //   // 1 当前页面
  //   callBackWhenPassAllFunc([() => isPage], action.getUserSunny);
  // }, [action.getUserSunny, isPage]);
}

// action types
export const UserSunnyReducerTypes = {
  setUserSunny: "setUserSunny"
};

// reducer
function reducer(state: IUserSunnyState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case UserSunnyReducerTypes.setUserSunny: {
      newState = {
        ...newState,
        userSunny: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
