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
import { IHistoryFilter, IListItem, ITodayTodo, ITodoItem } from "./interface";

import { IContextValue } from "../../../common/type";
import {
  decoratorFinish,
  decoratorTagReview,
  decoratorToday,
  decoratorTomorrow,
  todayPageFilter
} from "../util";

import server from "../server";

export const MyFocusContext = createContext({});
// store name
export const MyFocus = "MyFocus";

// store state
interface IContextState {
  todayTodo: ITodayTodo;
  todayDoneList: IListItem[];
  historyList: IListItem[];
  wishList: IListItem[];
  historyFilter: IHistoryFilter;
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
    historyList: [],
    wishList: [],
    historyFilter: {} as IHistoryFilter
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action = useGetAction(state, dispatch);

  // useEffect(() => {
  //   callBackWhenPassAllFunc([], action.getTodayTodo);
  // }, [action.getTodayTodo]);

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
  getHistoryByFilter: (filterInfo: IHistoryFilter) => any; // 获取历史
  getWishList: () => any; // 获取历史

  // 增
  addTodayTodo: (todo: ITodoItem) => any;
  addTomorrowTodo: (todo: { content: string; tag: string }) => any;
  addTomorrowReview: (content: string) => any;
  addWishList: (todo: ITodoItem) => any;
  //  新增任务
  _postNewItem: (todo: ITodoItem) => void;
  addTodayFinish: (todo: ITodoItem) => any; // 新增快速完成
  // 改
  changeTodoItem: (todo: ITodoItem) => void;
  changeStudyItemStatus: (id: any) => any; // 完成任务
  // 删除
  deleteItem: (id: string) => void;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IMyFocusActions {
  // 获取类
  const getHistoryByFilter: IMyFocusActions["getHistoryByFilter"] = useCallback(
    async function(data) {
      const res = await server.getHistoryByFilter(data);
      dispatch({
        type: myFocusReducerTypes.setHistoryList,
        value: res
      });
    },
    [dispatch]
  );
  const getTodayTodo: IMyFocusActions["getTodayTodo"] = useCallback(
    async function() {
      const res = await server.getTodayTodo();
      dispatch({
        type: myFocusReducerTypes.setList,
        value: res
      });
    },
    [dispatch]
  );

  const getTodayDone: IMyFocusActions["getTodayDone"] = useCallback(
    async function() {
      const res = await server.getTodayDone();
      dispatch({
        type: myFocusReducerTypes.setTodayDoneList,
        value: res
      });
    },
    [dispatch]
  );

  const getWishList: IMyFocusActions["getTodayDone"] = useCallback(
    async function() {
      const res = await server.getWishList();
      dispatch({
        type: myFocusReducerTypes.setWishList,
        value: res
      });
    },
    [dispatch]
  );

  // 添加类
  // 新增的底层功能接口

  const _postNewItem: IMyFocusActions["_postNewItem"] = useCallback(
    async function(todo) {
      const res = await server.postNewItem(todo);
      // 设置列表
      dispatch({
        type: myFocusReducerTypes.setList,
        value: res
      });
      // 自动拉取其他的数据.
      getTodayDone();
      getHistoryByFilter(state.historyFilter);
      getWishList();
      return res;
    },
    [
      dispatch,
      getHistoryByFilter,
      getTodayDone,
      getWishList,
      state.historyFilter
    ]
  );

  //新增一个常规任务
  const addTodayTodo: IMyFocusActions["addTodayTodo"] = useCallback(
    async function(todo) {
      return _postNewItem(decoratorToday(todo));
    },
    [_postNewItem]
  );

  //新增任务并马上完成
  const addTodayFinish: IMyFocusActions["addTodayFinish"] = useCallback(
    async function(todo) {
      await _postNewItem(decoratorFinish(decoratorToday(todo)));
      // 更新数据
      getTodayDone();
    },
    [_postNewItem, getTodayDone]
  );

  const addTomorrowReview: IMyFocusActions["addTomorrowReview"] = useCallback(
    async function(content: string) {
      return _postNewItem(
        // 这两个函数应该负责，将tag进行抽象，而不是靠调用者来指定。
        decoratorTagReview(decoratorTomorrow({ content }))
      );
    },
    [_postNewItem]
  );

  const addTomorrowTodo: IMyFocusActions["addTomorrowTodo"] = useCallback(
    async function(todo) {
      return _postNewItem(decoratorTomorrow(todo));
    },
    [_postNewItem]
  );

  // 新增一个with
  const addWishList: IMyFocusActions["addWishList"] = useCallback(
    async function(todo: ITodoItem) {
      const res: any = _postNewItem(todo);
      return res;
    },
    [_postNewItem]
  );

  // 更改类接口
  // 完成任务
  const changeStudyItemStatus: IMyFocusActions["changeStudyItemStatus"] = useCallback(
    async function(id: string) {
      // 进行状态更新
      const res = await server.changeStudyItemStatus({
        id: id,
        status: "finish"
      });
      // 使用心的状态
      dispatch({
        type: myFocusReducerTypes.setList,
        value: res
      });
    },
    [dispatch]
  );

  // 修改内容
  const changeTodoItem: IMyFocusActions["changeTodoItem"] = useCallback(
    async function(todo) {
      const res = await server.changeTodoItem(todo);
      dispatch({
        type: myFocusReducerTypes.setHistoryList,
        value: res
      });
      // 同样是同步一系列的数据
      getWishList();
      getTodayDone();
      getTodayTodo();
    },
    [dispatch, getTodayDone, getTodayTodo, getWishList]
  );

  const moveWishInto: IMyFocusActions["changeStudyItemStatus"] = useCallback(
    async function(id: string) {
      // 进行状态更新
      const res = await server.changeStudyItemStatus({
        id: id,
        status: "finish"
      });
      // 使用心的状态
      dispatch({
        type: myFocusReducerTypes.setList,
        value: res
      });
    },
    [dispatch]
  );

  // 删除指定的条目
  const deleteItem: IMyFocusActions["deleteItem"] = useCallback(
    async function(id: string) {
      const res = await server.deleteItem({ id });
      dispatch({
        type: myFocusReducerTypes.setHistoryList,
        value: res
      });
    },
    [dispatch]
  );
  return {
    getTodayTodo,
    getTodayDone,
    getHistoryByFilter,
    addTodayTodo,
    addTomorrowTodo,
    addTomorrowReview,
    _postNewItem,
    addTodayFinish,
    changeTodoItem,
    changeStudyItemStatus,
    deleteItem,
    getWishList,
    addWishList
  };
}

// action types
export const myFocusReducerTypes = {
  setList: "setList",
  setTodayDoneList: "setTodayDoneList",
  setHistoryList: "setHistoryList",
  setWishList: "setWishList"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case myFocusReducerTypes.setWishList: {
      newState = {
        ...newState,
        wishList: value
      };
      break;
    }
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
