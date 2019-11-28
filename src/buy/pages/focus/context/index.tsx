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
import moment from "moment";

export const MyFocusContext = createContext({});
// store name
export const MyFocus = "MyFocus";


interface ITodayTodo {
  plane: IListItem[];
  review: IListItem[];
  delay: IListItem[];
};

// store state
interface IContextState {
  todayTodo: ITodayTodo
}

// interface
export interface IMyFocusContext extends IMyFocusActions, IContextValue {
  myFocusContextValue: IContextState;
  myFocusContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function MyFocusContextProvider(props: any) {
  const initState: IContextState = {
    todayTodo: {} as any
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
/*

//
const addTodayTodo = serverName + "/newStudyTodoItem";
// 新增一个完成的任务。
const addTodayFinish = serverName + "/newStudyTodoItem";
// 新增一个tag为review的任务。
const addTodayReview = serverName + "/newStudyTodoItem";

// 为明日新增一个tag为review的任务。
const addTomorrowReview = serverName + "/newStudyTodoItem";
const addTomorrowTodo = serverName + "/newStudyTodoItem";

 */

// @actions
export interface IMyFocusActions {
  getTodayTodo: () => void;
  addTodayTodo: (data: any) => any;
  postNewItem: ({
    content,
    tag,
    planStartTime
  }: {
    content: string;
    tag: string;
    planStartTime: string;
  }) => void;
  changeItemContent: ({ id, content }: { id: string; content: string }) => void;
  deleteItem: (id: string) => void;
  changeStudyItemStatus: (id: any) => any;
  decoratorToday: (data: any) => any;// 设置开始时间为今天
  todayPageFilter: (data: any) => ITodayTodo[]

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
    todayPageFilter: function(data: any) {
      const jsonWithFilterData = {
        review: [],
        plane: [],
        delay: []
      } as any
      data.forEach((item: any) => {
        const {tag} = item
        switch(tag) {
          case 'review':
            jsonWithFilterData.review.push(item)
            break;
          default:
            jsonWithFilterData.plane.push(item)
        }
      })
      return jsonWithFilterData
    },
    decoratorToday: function(data: any) {
      return { planStartTime: moment(), ...data };
    },
    // 新增的底层功能接口
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
    //新增一个常规任务
    addTodayTodo: promisify(async function(data: any) {
      return actions.postNewItem(actions.decoratorToday(data));
    }),
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
        todayTodo: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
