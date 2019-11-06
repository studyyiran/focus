import React, { createContext, useReducer, useCallback, useRef } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { getTestAjaxResult } from "../server";
import { promisify } from "buy/common/utils/util";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { IContextValue } from "../../../common/interface/index.interface";

export const StoreTestNameContext = createContext({});
// store name
export const StoreTestName = "StoreTestName";
// store state
interface IContextState {
  testValue: number;
}

// interface
export interface IStoreTestNameContext
  extends IStoreTestNameActions,
    IContextValue {
  storeTestNameContextValue: IContextState;
  storeTestNameContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function StoreTestNameContextProvider(props: any) {
  const initState: IContextState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreTestNameActions = useGetAction(state, dispatch);

  const propsValue: IStoreTestNameContext = {
    ...action,
    storeTestNameContextValue: state,
    storeTestNameContextDispatch: dispatch
  };
  return <StoreTestNameContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IStoreTestNameActions {
  getTestAjaxValue: () => void;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IStoreTestNameActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IStoreTestNameActions = {
    getTestAjaxValue: promisify(async function() {
      const res = await getTestAjaxResult();
      dispatch({
        type: storeTestNameReducerTypes.setTestValue,
        value: res
      });
    })
  };
  actions.getTestAjaxValue = useCallback(actions.getTestAjaxValue, []);
  return actions;
}

// action types
export const storeTestNameReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeTestNameReducerTypes.setTestValue: {
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
