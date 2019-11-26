import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useEffect
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { callBackWhenPassAllFunc, promisify } from "buy/common/utils/util";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { IListItem } from "./interface";
import {
  getTodayTodo,
  postNewItem,
  changeItemContent,
  deleteItem,
  changeStudyItemStatus
} from "../server";
import { IContextValue } from "../../../common/type";
import { useIsCurrentPage } from "../../../common/useHook";

export const MyFocusContext = createContext({});
// store name
export const MyFocus = "MyFocus";
// store state
interface IContextState {
  list: IListItem[];
}

// interface
export interface IMyFocusContext extends IMyFocusActions, IContextValue {
  myFocusContextValue: IContextState;
  myFocusContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function MyFocusContextProvider(props: any) {
  const initState: IContextState = {
    list: [] as any[]
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IMyFocusActions = useGetAction(state, dispatch);

  const isPage = useIsCurrentPage("/focus");

  // @useEffect
  useEffect(() => {
    // 1 当前页面
    // 2 d
    callBackWhenPassAllFunc([() => isPage], action.getTodayTodo);
  }, [action.getTodayTodo]);

  const propsValue: IMyFocusContext = {
    ...action,
    myFocusContextValue: state,
    myFocusContextDispatch: dispatch
  };
  return <MyFocusContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IMyFocusActions {
  getTodayTodo: () => void;
  postNewItem: ({ content, tag }: { content: string; tag: string }) => void;
  changeItemContent: ({ id, content }: { id: string; content: string }) => void;
  deleteItem: (id: string) => void;
  changeStudyItemStatus: (id: any) => any;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IMyFocusActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IMyFocusActions = {
    changeStudyItemStatus: promisify(async function(id: string) {
      // 进行状态更新
      const res = await changeStudyItemStatus({
        id: id,
        status: "finish"
      });
      // 使用心的状态
      dispatch({
        type: myFocusReducerTypes.setList,
        value: res
      });
    }),
    getTodayTodo: promisify(async function() {
      const res = await getTodayTodo();
      dispatch({
        type: myFocusReducerTypes.setList,
        value: res
      });
    }),
    postNewItem: promisify(async function(data: {
      content: string;
      tag: string;
    }) {
      const res = await postNewItem(data);
      dispatch({
        type: myFocusReducerTypes.setList,
        value: res
      });
    }),
    changeItemContent: promisify(async function(data: {
      id: string;
      content: string;
    }) {
      const res = await changeItemContent(data);
      dispatch({
        type: myFocusReducerTypes.setList,
        value: res
      });
    }),
    deleteItem: promisify(async function(id: string) {
      const res = await deleteItem({ id });
      dispatch({
        type: myFocusReducerTypes.setList,
        value: res
      });
    })
  };
  actions.getTodayTodo = useCallback(actions.getTodayTodo, []);
  return actions;
}

// action types
export const myFocusReducerTypes = {
  setList: "setList"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case myFocusReducerTypes.setList: {
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
