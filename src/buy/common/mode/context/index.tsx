import React, { createContext, useReducer, useEffect } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { callBackWhenPassAllFunc } from "buy/common/utils/util";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { IContextValue } from "../../type";
import { useIsCurrentPage } from "../../useHook";
import {
  IStoreTestNameActions,
  useStoreTestNameGetActions
} from "./useGetActions";

export const StoreTestNameContext = createContext({});

// store name
export const StoreTestName = "StoreTestName";
// store state
export interface IStoreTestNameState {
  testValue: number;
}

// interface
export interface IStoreTestNameContext
  extends IStoreTestNameActions,
    IContextValue {
  storeTestNameContextValue: IStoreTestNameState;
  storeTestNameContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function StoreTestNameContextProvider(props: any) {
  const initState: IStoreTestNameState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreTestNameActions = useStoreTestNameGetActions(
    state,
    dispatch
  );

  const propsValue: IStoreTestNameContext = {
    ...action,
    storeTestNameContextValue: state,
    storeTestNameContextDispatch: dispatch
  };
  return <StoreTestNameContext.Provider value={propsValue} {...props} />;
}

// action types
export const IStoreTestNameReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state: IStoreTestNameState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case IStoreTestNameReducerTypes.setTestValue: {
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
