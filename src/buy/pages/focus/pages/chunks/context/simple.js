import React, {
  createContext,
  useReducer,
  useCallback
} from "react";
// 引入请求层
import { storeChunksServer } from "../server";

export const StoreChunksContext = createContext({});

// store name
export const StoreChunks = "StoreChunks";


// store provider
export function StoreChunksContextProvider(props) {
  const initState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(reducer, initState);

  // 传入state dispatch -> actions请求中间体
  const action = useStoreChunksGetActions(
    state,
    dispatch
  );

  const contextValue = {
    // contextValue = 所有的请求中间体 + stateValue + dispatch
    ...action,
    storeChunksContextValue: state,
    storeChunksContextDispatch: dispatch
  };
  return <StoreChunksContext.Provider value={contextValue} {...props} />;
}

// useGetActions
export function useStoreChunksGetActions(
  state,
  dispatch
) {
  // useCallBack包装得到了一个: 依赖于状态的函数.
  const getTestAjaxValue = useCallback(
    async function(n) {
      const res = await storeChunksServer.getTestAjaxResult(n);
      dispatch({
        type: storeChunksReducerTypes.setTestValue,
        value: res
      });
    },
    [dispatch]
  );
  return {
    getTestAjaxValue
  };
}

// reducer action types
export const storeChunksReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state, action) {
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
