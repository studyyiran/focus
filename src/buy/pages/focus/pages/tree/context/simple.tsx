import React, {createContext, useReducer, useEffect, useCallback} from "react";
// 引入请求层
import {godTreeServer} from "../server";

export const GodTreeContext = createContext({});

export interface IReducerAction {
  type: string;
  value?: any;
}

// store name
export const GodTree = "GodTree";

// store state
export interface IGodTreeState {
  testValue: number;
}

// store context value
export interface IGodTreeContext extends IGodTreeActions {
  godTreeContextValue: IGodTreeState;
  godTreeContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function GodTreeContextProvider(props: any) {
  const initState: IGodTreeState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(reducer, initState);

  // 传入state dispatch -> actions请求中间体
  const action: IGodTreeActions = useGodTreeGetActions(
    state,
    dispatch
  );

  // global useEffect
  const { getTestAjaxValue } = action;
  useEffect(() => {
    getTestAjaxValue();
  }, [getTestAjaxValue]);

  const contextValue: IGodTreeContext = {
    // contextValue = 所有的请求中间体 + stateValue + dispatch
    ...action,
    godTreeContextValue: state,
    godTreeContextDispatch: dispatch
  };
  return <GodTreeContext.Provider value={contextValue} {...props} />;
}

// actions type
export interface IGodTreeActions {
  getTestAjaxValue: () => void;
}

// useGetActions
export function useGodTreeGetActions (
  state: IGodTreeState,
  dispatch: (action: IReducerAction) => void
): IGodTreeActions {
  // useCallBack包装得到了一个: 依赖于状态的函数.
  const getTestAjaxValue = useCallback(async function() {
    const res = await godTreeServer.getTestAjaxResult();
    dispatch({
      type: godTreeReducerTypes.setTestValue,
      value: res
    });
  }, [dispatch])
  return {
    getTestAjaxValue
  };
}

// reducer action types
export const godTreeReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state: IGodTreeState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case godTreeReducerTypes.setTestValue: {
      newState = {
        ...newState,
        testValue: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}