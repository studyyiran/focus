import React, { createContext, useReducer, useEffect } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { ITargetInfoActions, useTargetInfoGetActions } from "./useGetActions";
import { IContextValue } from "../../../../../common/type";
import useReducerMiddleware from "../../../../../common/useHook/useReducerMiddleware";
import moment from "moment-timezone";

export const TargetInfoContext = createContext({} as ITargetInfoContext);

// store name
export const TargetInfo = "TargetInfo";

export interface TargetTodoInfo {
  _id: string;
  todoId: string;
  content: string;
  tag: string;
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
  status: string;
  _id: string;
  process: ISubTarget[];
  level: number;
  createTime: string;
  lockType: string;
  finalComments: string;
}

// store state
export interface ITargetInfoState {
  targetList: ITarget[];
  targetListHaveFinish: ITarget[];
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
    targetListHaveFinish: [] as ITargetInfoState["targetList"]
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: ITargetInfoActions = useTargetInfoGetActions(state, dispatch);

  const { getTargetList } = action;

  useEffect(() => {
    getTargetList();
  }, [getTargetList]);

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
  setTargetList: "setTargetList",
  setTargetListHaveFinish: "setTargetListHaveFinish"
};

// 获取target列表
function getLastUpdateTime(target: ITarget) {
  if (target && target.process && target.process[0]) {
    const current = target.process[0];
    if (current && current.todos && current.todos[0]) {
      return current.todos[0].createTime;
    }
    return target.process[0].createTime;
  } else {
    return target.createTime;
  }
}
export function getCurrentTargetName(targetInfo: ITarget) {
  if (targetInfo) {
    const { status, finalComments, process } = targetInfo;
    const {targetName} = process[0];
    if (status === "doing") {
      return targetName;
    } else {
      if (finalComments) {
        return finalComments;
      } else {
        return targetName;
      }
    }
  } else {
    return "empty";
  }
}

// reducer
function reducer(state: ITargetInfoState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case ITargetInfoReducerTypes.setTargetList: {
      newState = {
        ...newState,
        targetList: (value as ITarget[]).sort((a, b) => {
          if (
              moment(getLastUpdateTime(a)).isBefore(moment(getLastUpdateTime(b)))
          ) {
            return 1;
          } else {
            return -1;
          }
          return 0;
        })
      };
      break;
    }
    case ITargetInfoReducerTypes.setTargetListHaveFinish: {
      newState = {
        ...newState,
        targetListHaveFinish: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
