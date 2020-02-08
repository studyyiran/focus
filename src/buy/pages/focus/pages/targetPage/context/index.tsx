import React, { createContext, useReducer, useEffect } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { ITargetInfoActions, useTargetInfoGetActions } from "./useGetActions";
import { IContextValue } from "../../../../../common/type";
import useReducerMiddleware from "../../../../../common/useHook/useReducerMiddleware";

export const TargetInfoContext = createContext({} as ITargetInfoContext);

// store name
export const TargetInfo = "TargetInfo";

export interface TargetTodoInfo {
  _id: string;
  todoId: string;
  targetName: string;
  createTime: string;
}

export interface ISubTarget {
  _id: string;
  targetName: string;
  status: string;
  todos: TargetTodoInfo[];
  createTime: string;
  levelUpTime: string;
}

export interface ITarget {
  status: string,
  _id: string,
  process: ISubTarget[],
  level: number,
};

// store state
export interface ITargetInfoState {
  targetList: ITarget[]
}

// interface
export interface ITargetInfoContext extends ITargetInfoActions, IContextValue {
  targetInfoContextValue: ITargetInfoState;
  targetInfoContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function TargetInfoContextProvider(props: any) {
  const initState: ITargetInfoState = {
    targetList: [] as ITargetInfoState["targetList"],
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
