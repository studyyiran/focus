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

import {IStoreChunksActions, useStoreChunksGetActions} from "./useGetActions";

export const StoreChunksContext = createContext({} as IStoreChunksContext);

// store name
export const StoreChunks = "StoreChunks";

interface ILearnRecord {
  createTime: String,// add time
  startTime: String,
  lastingTime: String,
  finishTime: String,
  status: String,
  tag: String,
  buffId: String,
  content: String,
}


export interface IChunks {
  createTime: String,
  name: String,
  status: String
  learnLine: [{
    learnRecord: ILearnRecord[]
  }]
}

// store state
export interface IStoreChunksState {
  chunksList: IChunks[];
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
    chunksList: []
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreChunksActions = useStoreChunksGetActions(state, dispatch);

  const propsValue: IStoreChunksContext = {
    ...action,
    storeChunksContextValue: state,
    storeChunksContextDispatch: dispatch
  };
  return <StoreChunksContext.Provider value={propsValue} {...props} />;

  // const isPage = useIsCurrentPage("/test");
  // @useEffect
  // useEffect(() => {
  //   // 1 当前页面
  //   callBackWhenPassAllFunc([() => isPage], action.getTestAjaxValue);
  // }, [action.getTestAjaxValue, isPage]);
}



// action types
export const storeChunksReducerTypes = {
  setChunksList: "setChunksList"
};

// reducer
function reducer(state: IStoreChunksState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeChunksReducerTypes.setChunksList: {
      newState = {
        ...newState,
        chunksList: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
