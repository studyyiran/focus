import React, { createContext, useReducer, useCallback, useRef } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { getTestAjaxResult } from "../server";
import { promisify } from "buy/common/utils/util";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { IContextValue } from "../../../common/interface/index.interface";

export const EntryPageContext = createContext({});
// store name
export const EntryPage = "EntryPage";
// store state
interface IContextState {
  testValue: number;
}

// interface
export interface IEntryPageContext
  extends IEntryPageActions,
    IContextValue {
  entryPageContextValue: IContextState;
  entryPageContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function EntryPageContextProvider(props: any) {
  const initState: IContextState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IEntryPageActions = useGetAction(state, dispatch);

  const propsValue: IEntryPageContext = {
    ...action,
    entryPageContextValue: state,
    entryPageContextDispatch: dispatch
  };
  return <EntryPageContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IEntryPageActions {
  getTestAjaxValue: () => void;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IEntryPageActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IEntryPageActions = {
    getTestAjaxValue: promisify(async function() {
      const res = await getTestAjaxResult();
      dispatch({
        type: entryPageReducerTypes.setTestValue,
        value: res
      });
    })
  };
  actions.getTestAjaxValue = useCallback(actions.getTestAjaxValue, []);
  return actions;
}

// action types
export const entryPageReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case entryPageReducerTypes.setTestValue: {
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
