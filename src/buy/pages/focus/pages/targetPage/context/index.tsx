import React, { createContext, useReducer, useEffect } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { ITargetInfoActions, useTargetInfoGetActions } from "./useGetActions";
import { IContextValue } from "../../../../../common/type";
import useReducerMiddleware from "../../../../../common/useHook/useReducerMiddleware";

export const TargetInfoContext = createContext({});

// store name
export const TargetInfo = "TargetInfo";

export interface ITargetWithConut {
  id: string,
  targetName: string,
  count: Number,
}

// store state
export interface ITargetInfoState {
  targetWithCountList: ITargetWithConut[];
}

// interface
export interface ITargetInfoContext extends ITargetInfoActions, IContextValue {
  targetInfoContextValue: ITargetInfoState;
  targetInfoContextDispatch: (action: IReducerAction) => void;
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

  const propsValue: ITargetInfoContext = {
    ...action,
    targetInfoContextValue: state,
    targetInfoContextDispatch: dispatch
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
