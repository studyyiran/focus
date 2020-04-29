import React, {
  useCallback,
  useRef,
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {sunnyServer} from "../../server/sunny";
import {IUserSunnyState, UserSunnyReducerTypes} from "./index";

// @actions
export interface IUserSunnyActions {
  getUserSunny: () => any;
  loginSunny: () => any;
}

// useCreateActions
export function useUserSunnyGetActions (
  state: IUserSunnyState,
  dispatch: (action: IReducerAction) => void
): IUserSunnyActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const getUserSunny = useCallback(async function() {
    const res = await sunnyServer.getUserSunny();
    dispatch({
      type: UserSunnyReducerTypes.setUserSunny,
      value: res
    });
  }, [dispatch])
  const loginSunny = useCallback(async function() {
    const res = await sunnyServer.loginSunny();
    dispatch({
      type: UserSunnyReducerTypes.setUserSunny,
      value: res
    });
  }, [dispatch])

  return {
    getUserSunny,
    loginSunny,
  };
}