import React, {createContext, useReducer, useEffect, useCallback} from "react";
// 引入请求层
import {storeChunksServer} from "../server";

export const StoreChunksContext = createContext({});

export interface IReducerAction {
  type: string;
  value?: any;
}

// store name
export const StoreChunks = "StoreChunks";

// store state
export interface IStoreChunksState {
  testValue: number;
}

// store context value
export interface IStoreChunksContext extends IStoreChunksActions {
  storeChunksContextValue: IStoreChunksState;
  storeChunksContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function StoreChunksContextProvider(props: any) {
  const initState: IStoreChunksState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(reducer, initState);

  // 传入state dispatch -> actions请求中间体
  const action: IStoreChunksActions = useStoreChunksGetActions(
    state,
    dispatch
  );

  // global useEffect
  const { getTestAjaxValue } = action;
  useEffect(() => {
    getTestAjaxValue();
  }, [getTestAjaxValue]);

  const contextValue: IStoreChunksContext = {
    // contextValue = 所有的请求中间体 + stateValue + dispatch
    ...action,
    storeChunksContextValue: state,
    storeChunksContextDispatch: dispatch
  };
  return <StoreChunksContext.Provider value={contextValue} {...props} />;
}

// actions type
export interface IStoreChunksActions {
  getTestAjaxValue: () => void;
}

// useGetActions
export function useStoreChunksGetActions (
  state: IStoreChunksState,
  dispatch: (action: IReducerAction) => void
): IStoreChunksActions {
  // useCallBack包装得到了一个: 依赖于状态的函数.
  const getTestAjaxValue = useCallback(async function() {
    const res = await storeChunksServer.getTestAjaxResult();
    dispatch({
      type: storeChunksReducerTypes.setTestValue,
      value: res
    });
  }, [dispatch])
  return {
    getTestAjaxValue
  };
}

// reducer action types
export const storeChunksReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state: IStoreChunksState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeChunksReducerTypes.setTestValue: {
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