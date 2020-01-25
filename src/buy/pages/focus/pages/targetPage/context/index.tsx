import React, { createContext, useReducer, useEffect } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { callBackWhenPassAllFunc } from "buy/common/utils/util";
import { ITargetInfoActions, useTargetInfoGetActions } from "./useGetActions";
import { IContextValue } from "../../../../../common/type";
import useReducerMiddleware from "../../../../../common/useHook/useReducerMiddleware";
import { useIsCurrentPage } from "../../../../../common/useHook";

export const TargetInfoContext = createContext({});

// store name
export const TargetInfo = "TargetInfo";

export interface ITargetWithConut {

}

// store state
export interface ITargetInfoState {
  targetWithCountList: ITargetWithConut[];
}

// interface
export interface ITargetInfoContext extends ITargetInfoActions, IContextValue {
  TargetInfoContextValue: ITargetInfoState;
  TargetInfoContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function TargetInfoContextProvider(props: any) {
  const initState: ITargetInfoState = {
    targetWithCountList: []
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: ITargetInfoActions = useTargetInfoGetActions(state, dispatch);

  const isPage = useIsCurrentPage("/test");

  // @useEffect
  useEffect(() => {
    // 1 当前页面
    callBackWhenPassAllFunc([() => isPage], action.getTestAjaxValue);
  }, [action.getTestAjaxValue, isPage]);

  const propsValue: ITargetInfoContext = {
    ...action,
    TargetInfoContextValue: state,
    TargetInfoContextDispatch: dispatch
  };
  return <TargetInfoContext.Provider value={propsValue} {...props} />;
}

// action types
export const ITargetInfoReducerTypes = {
  setTargetWithCountList: "setTargetWithCountList"
};

// reducer
function reducer(state: ITargetInfoState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case ITargetInfoReducerTypes.setTargetWithCountList: {
      newState = {
        ...newState,
        targetWithCountList: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
