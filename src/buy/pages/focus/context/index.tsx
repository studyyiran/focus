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
import { IListItem, ITodayTodo } from "./interface";

import { IContextValue } from "../../../common/type";
import {
  decoratorFinish,
  decoratorTagReview,
  decoratorToday,
  decoratorTomorrow,
  todayPageFilter
} from "../util";

import {
  getTodayTodo,
  getTodayDone,
  postNewItem,
  changeItemContent,
  deleteItem,
  changeStudyItemStatus,
  getHistoryByFilter
} from "../server";

export const MyFocusContext = createContext({});
// store name
export const MyFocus = "MyFocus";

// store state
interface IContextState {
  todayTodo: ITodayTodo;
  todayDoneList: IListItem[];
  historyList: IListItem[];
}

// interface
export interface IMyFocusContext extends IMyFocusActions, IContextValue {
  myFocusContextValue: IContextState;
  myFocusContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function MyFocusContextProvider(props: any) {
  const initState: IContextState = {
    todayTodo: {} as any,
    todayDoneList: [],
    historyList: []
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IMyFocusActions = useGetAction(state, dispatch);

  useEffect(() => {
    callBackWhenPassAllFunc([], action.getTodayTodo);
  }, [action.getTodayTodo]);

  const propsValue: IMyFocusContext = {
    ...action,
    myFocusContextValue: state,
    myFocusContextDispatch: dispatch
  };
  return <MyFocusContext.Provider value={propsValue} {...props} />;
}
/*

//
const addTodayTodo = serverName + "/newStudyTodoItem";


// 新增一个tag为review的任务。
const addTodayReview = serverName + "/newStudyTodoItem";

// 为明日新增一个tag为review的任务。
const addTomorrowReview = serverName + "/newStudyTodoItem";
const addTomorrowTodo = serverName + "/newStudyTodoItem";

 */

// @actions
export interface IMyFocusActions {
  // 查询
  getTodayTodo: () => void;
  getTodayDone: () => any;
  getHistoryByFilter: (filterInfo: any) => any; // 获取历史

  // 增
  addTodayTodo: (data: any) => any;
  addTomorrowTodo: (data: any) => any;
  addTomorrowReview: (data: any) => any;
  //  新增任务
  postNewItem: ({
    content,
    tag,
    planStartTime
  }: {
    content: string;
    tag: string;
    planStartTime: string;
  }) => void;
  addTodayFinish: (data: any) => any; // 新增快速完成
  // 改
  changeItemContent: (data: any) => void;
  changeStudyItemStatus: (id: any) => any; // 完成任务
  // 删除
  deleteItem: (id: string) => void;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IMyFocusActions {
  const actions: IMyFocusActions = {
    // 添加类
    // 新增的底层功能接口
    postNewItem: useCallback(async function(data: {
      content: string;
      tag: string;
    }) {
      const res = await postNewItem(data);
      dispatch({
        type: myFocusReducerTypes.setList,
        value: res
      });
    }, []),
    //新增一个常规任务
    addTodayTodo: useCallback(async function(data: any) {
      return actions.postNewItem(decoratorToday(data));
    }, []),
    //新增任务并马上完成
    addTodayFinish: useCallback(async function(data: any) {
      await actions.postNewItem(decoratorFinish(decoratorToday(data)));
      // 更新数据
      actions.getTodayDone();
    }, []),
    addTomorrowReview: useCallback(async function(content: string) {
      return actions.postNewItem(
        // 这两个函数应该负责，将tag进行抽象，而不是靠调用者来指定。
        decoratorTagReview(decoratorTomorrow({ content }))
      );
    }, []),
    addTomorrowTodo: useCallback(async function(data: {
      content: string;
      tag: string;
    }) {
      return actions.postNewItem(decoratorTomorrow(data));
    }, []),
    //
    // 获取类
    getHistoryByFilter: useCallback(async function(data: any) {
      const res = await getHistoryByFilter(data);
      dispatch({
        type: myFocusReducerTypes.setHistoryList,
        value: res
      });
    }, []),
    getTodayTodo: useCallback(async function() {
      const res = await getTodayTodo();
      dispatch({
        type: myFocusReducerTypes.setList,
        value: res
      });
    }, []),
    getTodayDone: useCallback(async function(data: {
      content: string;
      tag: string;
    }) {
      const res = await getTodayDone();
      dispatch({
        type: myFocusReducerTypes.setTodayDoneList,
        value: res
      });
    }, []),
    //
    // 更改类接口
    // 完成任务
    changeStudyItemStatus: useCallback(async function(id: string) {
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
    }, []),
    // 修改内容
    changeItemContent: useCallback(async function(data: any) {
      const res = await changeItemContent(data);
      dispatch({
        type: myFocusReducerTypes.setHistoryList,
        value: res
      });
    }, []),
    // 删除指定的条目
    deleteItem: useCallback(async function(id: string) {
      const res = await deleteItem({ id });
      dispatch({
        type: myFocusReducerTypes.setHistoryList,
        value: res
      });
    }, [])
  };
  return actions;
}

// action types
export const myFocusReducerTypes = {
  setList: "setList",
  setTodayDoneList: "setTodayDoneList",
  setHistoryList: "setHistoryList"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case myFocusReducerTypes.setHistoryList: {
      newState = {
        ...newState,
        historyList: value
      };
      break;
    }
    case myFocusReducerTypes.setTodayDoneList: {
      newState = {
        ...newState,
        todayDoneList: value
      };
      break;
    }
    case myFocusReducerTypes.setList: {
      newState = {
        ...newState,
        todayTodo: todayPageFilter(value)
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
