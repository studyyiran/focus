import React, { createContext, useReducer, useEffect } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { ITargetInfoActions, useTargetInfoGetActions } from "./useGetActions";
import { IContextValue } from "../../../../../common/type";
import useReducerMiddleware from "../../../../../common/useHook/useReducerMiddleware";
import moment from "moment-timezone";

export const TargetInfoContext = createContext({} as ITargetInfoContext);

// store name
export const TargetInfo = "TargetInfo";

export interface ITargetTodoInfo {
  _id: string;
  todoId: string;
  content: string;
  tag: string;
  todoRelateTargetTime: string;
  todoCreateTime: string;
  todoFinishDate: string;
}

export interface ISubTarget {
  _id: string;
  targetName: string;
  status: string;
  todos: ITargetTodoInfo[];
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
  currentTargetInfo: ITarget;
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
    targetListHaveFinish: [] as ITargetInfoState["targetList"],
    currentTargetInfo: {} as any
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

  const { setCurrentTargetInfo } = action;
  useEffect(() => {
    // 当list变化的时候，重新。。。
    if (state.currentTargetInfo) {
      const current = state.targetList.find((target: any) => {
        return target._id === state.currentTargetInfo._id;
      });
      if (!current) {
        if (state.currentTargetInfo._id) {
          setCurrentTargetInfo();
        }
      } else if (state.currentTargetInfo !== current) {
        setCurrentTargetInfo(current._id);
      }
    }
  }, [setCurrentTargetInfo, state.currentTargetInfo, state.targetList]);

  const propsValue: ITargetInfoContext = {
    ...action,
    targetInfoContextValue: state,
    targetInfoContextDispatch: dispatch
  };
  return <TargetInfoContext.Provider value={propsValue} {...props} />;
}

// action types
export const ITargetInfoReducerTypes = {
  setTargetList: "setTargetList",
  setTargetListHaveFinish: "setTargetListHaveFinish",
  setCurrentTargetInfo: "setCurrentTargetInfo"
};

// 获取target列表
function getLastUpdateTime(target: ITarget) {
  if (target && target.process && target.process[0]) {
    const current = target.process[0];
    if (current && current.todos && current.todos[0]) {
      return current.todos[0].todoRelateTargetTime;
    }
    return target.process[0].createTime;
  } else {
    return target.createTime;
  }
}
export function getCurrentTargetName(targetInfo: ITarget) {
  if (targetInfo) {
    const { status, finalComments, process } = targetInfo;
    const { targetName } = process[0];
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
    case ITargetInfoReducerTypes.setCurrentTargetInfo: {
      newState = {
        ...newState,
        currentTargetInfo: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
