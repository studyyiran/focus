import React, { createContext, useReducer, useEffect } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
// import { callBackWhenPassAllFunc } from "buy/common/utils/util";
// import { useIsCurrentPage } from "buy/common/useHook";
import useReducerMiddleware from "buy/common/useHook/useReducerMiddleware";
import { IContextValue } from "buy/common/type";

import { IStoreChunksActions, useStoreChunksGetActions } from "./useGetActions";
import { useIsCurrentPage } from "../../../../../common/useHook";
import { callBackWhenPassAllFunc } from "../../../../../common/utils/util";

export const StoreChunksContext = createContext({} as IStoreChunksContext);

// store name
export const StoreChunks = "StoreChunks";

export interface ILearnRecord {
  _id: string;
  createTime: string; // add time
  startTime: string;
  lastingTime: string;
  finishTime: string;
  status: string;
  tag: string;
  buffId: {
    buffName: string,
    content: string,
    _id: string,
  };
  content: string;
}

export interface IChunks {
  createTime: string;
  name: string;
  _id: string;
  status: string;
  learnLine: [
    {
      learnRecord: ILearnRecord[];
    }
  ];
}

interface IBuffInfo {
  buffName: String,
  content: String,
  _id: String,
}

// store state
export interface IStoreChunksState {
  chunksList: IChunks[];
  serverCurrentTime: String;
  studyBuffList: IBuffInfo[];
}

// interface
export interface IStoreChunksContext
  extends IStoreChunksActions,
    IContextValue {
  storeChunksContextValue: IStoreChunksState;
  storeChunksContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function StoreChunksContextProvider(props: any) {
  const initState: IStoreChunksState = {
    chunksList: [],
    serverCurrentTime: "",
    studyBuffList: []
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreChunksActions = useStoreChunksGetActions(state, dispatch);

  const isPage = useIsCurrentPage("/focus/chunks");
  useEffect(() => {
    // 1 当前页面
    callBackWhenPassAllFunc([() => isPage], action.getStudyBuffList);
  }, [action.getStudyBuffList, isPage]);

  const propsValue: IStoreChunksContext = {
    ...action,
    storeChunksContextValue: state,
    storeChunksContextDispatch: dispatch
  };
  return <StoreChunksContext.Provider value={propsValue} {...props} />;
}

// action types
export const storeChunksReducerTypes = {
  setChunksList: "setChunksList",
  setStudyBuffList: "setStudyBuffList"
};

// reducer
function reducer(state: IStoreChunksState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeChunksReducerTypes.setChunksList: {
      newState = {
        ...newState,
        chunksList: value.chunksList,
        serverCurrentTime: value.serverCurrentTime
      };
      break;
    }
    case storeChunksReducerTypes.setStudyBuffList: {
      newState = {
        ...newState,
        studyBuffList: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
