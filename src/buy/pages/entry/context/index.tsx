import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useEffect
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { getTestAjaxResult } from "../server";
import { promisify } from "buy/common/utils/util";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { IContextValue } from "../../../common/interface/index.interface";
import {
  callBackWhenPassAllFunc,
  useIsCurrentPage
} from "../../detail/context/test";

export const EntryPageContext = createContext({});
// store name
export const EntryPage = "EntryPage";
// store state
interface IContextState {
  list: any[];
}

// interface
export interface IEntryPageContext extends IEntryPageActions, IContextValue {
  entryPageContextValue: IContextState;
  entryPageContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function EntryPageContextProvider(props: any) {
  const initState: IContextState = {
    list: [] as any[]
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IEntryPageActions = useGetAction(state, dispatch);

  const isPage = useIsCurrentPage("/test");

  // @useEffect
  useEffect(() => {
    // 1 当前页面
    // 2 d
    callBackWhenPassAllFunc([() => isPage], action.getTestAjaxValue);
  }, [action.getTestAjaxValue]);

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
        type: entryPageReducerTypes.setList,
        value: res
      });
    })
  };
  actions.getTestAjaxValue = useCallback(actions.getTestAjaxValue, []);
  return actions;
}

// action types
export const entryPageReducerTypes = {
  setList: "setList"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case entryPageReducerTypes.setList: {
      newState = {
        ...newState,
        list: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
