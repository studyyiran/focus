import React, { createContext, useReducer, useEffect } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { ITargetInfoActions, useTargetInfoGetActions } from "./useGetActions";
import { IContextValue } from "../../../../../common/type";
import useReducerMiddleware from "../../../../../common/useHook/useReducerMiddleware";

export const TargetInfoContext = createContext({});

// store name
export const TargetInfo = "TargetInfo";

export interface ITarget {
  id: string;
  targetName: string;
}

export interface ITargetWithCount extends ITarget {
  count: Number;
}

// store state
export interface ITargetInfoState {
  targetWithCountList: ITargetWithCount[];
  targetList: ITarget[];
}

// interface
export interface ITargetInfoContext extends ITargetInfoActions, IContextValue {
  targetInfoContextValue: ITargetInfoState;
  targetInfoContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function TargetInfoContextProvider(props: any) {
  const initState: ITargetInfoState = {
    targetWithCountList: [],
    targetList: []
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: ITargetInfoActions = useTargetInfoGetActions(state, dispatch);

  useEffect(() => {
    action.getTargetList();
  }, [action.getTargetList]);

  const propsValue: ITargetInfoContext = {
    ...action,
    targetInfoContextValue: state,
    targetInfoContextDispatch: dispatch
  };
  return <TargetInfoContext.Provider value={propsValue} {...props} />;
}

// action types
export const ITargetInfoReducerTypes = {
  setTargetWithCountList: "setTargetWithCountList",
  setTargetList: "setTargetList"
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
    case ITargetInfoReducerTypes.setTargetList: {
      newState = {
        ...newState,
        targetList: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
