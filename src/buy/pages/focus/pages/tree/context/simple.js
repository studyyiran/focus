import React, {
  createContext,
  useReducer,
  useCallback
} from "react";
// 引入请求层
import { godTreeServer } from "../server";

export const GodTreeContext = createContext({});

// store name
export const GodTree = "GodTree";


// store provider
export function GodTreeContextProvider(props) {
  const initState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(reducer, initState);

  // 传入state dispatch -> actions请求中间体
  const action = useGodTreeGetActions(
    state,
    dispatch
  );

  const contextValue = {
    // contextValue = 所有的请求中间体 + stateValue + dispatch
    ...action,
    godTreeContextValue: state,
    godTreeContextDispatch: dispatch
  };
  return <GodTreeContext.Provider value={contextValue} {...props} />;
}

// useGetActions
export function useGodTreeGetActions(
  state,
  dispatch
) {
  // useCallBack包装得到了一个: 依赖于状态的函数.
  const getTestAjaxValue = useCallback(
    async function(n) {
      const res = await godTreeServer.getTestAjaxResult(n);
      dispatch({
        type: godTreeReducerTypes.setTestValue,
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
export const godTreeReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state, action) {
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
