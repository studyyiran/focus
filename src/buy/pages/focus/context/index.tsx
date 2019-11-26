import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useEffect
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {callBackWhenPassAllFunc, promisify} from "buy/common/utils/util";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { IListItem } from "./interface";
import {
  getTodayTodo,
  postNewItem,
  changeItemContent,
  deleteItem
} from "../server";
import {IContextValue} from "../../../common/type";
import {useIsCurrentPage} from "../../../common/useHook";

export const EntryPageContext = createContext({});
// store name
export const EntryPage = "EntryPage";
// store state
interface IContextState {
  list: IListItem[];
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
    callBackWhenPassAllFunc([() => isPage], action.getTodayTodo);
  }, [action.getTodayTodo]);

  const propsValue: IEntryPageContext = {
    ...action,
    entryPageContextValue: state,
    entryPageContextDispatch: dispatch
  };
  return <EntryPageContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IEntryPageActions {
  getTodayTodo: () => void;
  postNewItem: ({ content, tag }: { content: string; tag: string }) => void;
  changeItemContent: ({ id, content }: { id: string; content: string }) => void;
  deleteItem: (id: string) => void;
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
    getTodayTodo: promisify(async function() {
      const res = await getTodayTodo();
      dispatch({
        type: entryPageReducerTypes.setList,
        value: res
      });
    }),
    postNewItem: promisify(async function(data: {
      content: string;
      tag: string;
    }) {
      const res = await postNewItem(data);
      dispatch({
        type: entryPageReducerTypes.setList,
        value: res
      });
    }),
    changeItemContent: promisify(async function(data: {
      id: string;
      content: string;
    }) {
      const res = await changeItemContent(data);
      dispatch({
        type: entryPageReducerTypes.setList,
        value: res
      });
    }),
    deleteItem: promisify(async function(id: string) {
      const res = await deleteItem({ id });
      dispatch({
        type: entryPageReducerTypes.setList,
        value: res
      });
    })
  };
  actions.getTodayTodo = useCallback(actions.getTodayTodo, []);
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
