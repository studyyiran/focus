import React, {
  createContext,
  useReducer,
  useEffect
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
// import { callBackWhenPassAllFunc } from "buy/common/utils/util";
// import { useIsCurrentPage } from "buy/common/useHook";
import useReducerMiddleware from "buy/common/useHook/useReducerMiddleware";
import { IContextValue } from "buy/common/type";

import {ISeasonActions, useSeasonGetActions} from "./useGetActions";
import { IListItem } from "../../../context/interface";

export const SeasonContext = createContext({} as ISeasonContext);

// store name
export const Season = "Season";

export interface IBuffRecord {
  continueTime: string,
  createTime: string,
  type: string,
}
// store state
export interface ISeasonState {
  seasonList: ISeason[];
  seasonNotDoingList: ISeason[];
  todayLearnThingList: IListItem[];
  buffRecord: IBuffRecord[];
}

export interface ISeason {
  createTime: string,
  status: string,
  _id: string,
  name: string,
  slots: [
    {
      isLock: boolean,
      children: [
        {
          addTime: string,// add time
          todoId: string,
        }
      ]
    }
  ]
}

// interface
export interface ISeasonContext
  extends ISeasonActions,
    IContextValue {
  seasonContextValue: ISeasonState;
  seasonContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function SeasonContextProvider(props: any) {
  const initState: ISeasonState = {
    seasonList: [],
    seasonNotDoingList: [],
    todayLearnThingList: [],
    buffRecord: [] as any[]
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: ISeasonActions = useSeasonGetActions(state, dispatch);

  const propsValue: ISeasonContext = {
    ...action,
    seasonContextValue: state,
    seasonContextDispatch: dispatch
  };
  return <SeasonContext.Provider value={propsValue} {...props} />;

  // const isPage = useIsCurrentPage("/test");
  // @useEffect
  // useEffect(() => {
  //   // 1 当前页面
  //   callBackWhenPassAllFunc([() => isPage], action.getTestAjaxValue);
  // }, [action.getTestAjaxValue, isPage]);
}



// action types
export const seasonReducerTypes = {
  setSeasonList: "setSeasonList",
  setSeasonNotDoingList: "setSeasonNotDoingList",
  setTodayLearnThingList: "setTodayLearnThingList",
  setBuffRecord: "setBuffRecord"
};

// reducer
function reducer(state: ISeasonState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case seasonReducerTypes.setSeasonList: {
      newState = {
        ...newState,
        seasonList: value
      };
      break;
    }
    case seasonReducerTypes.setSeasonNotDoingList: {
      newState = {
        ...newState,
        seasonNotDoingList: value
      };
      break;
    }
    case seasonReducerTypes.setTodayLearnThingList: {
      newState = {
        ...newState,
        todayLearnThingList: value
      };
      break;
    }
    case seasonReducerTypes.setBuffRecord: {
      newState = {
        ...newState,
        buffRecord: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
