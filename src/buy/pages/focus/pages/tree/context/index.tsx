import React, {
  createContext,
  useReducer,
  useEffect
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { callBackWhenPassAllFunc } from "buy/common/utils/util";
import useReducerMiddleware from "buy/common/useHook/useReducerMiddleware";
import { IContextValue } from "buy/common/type";
import { useIsCurrentPage } from "buy/common/useHook";
import {IGodTreeActions, useGodTreeGetActions} from "./useGetActions";

export const GodTreeContext = createContext({} as IGodTreeContext);

// store name
export const GodTree = "GodTree";
// store state
export interface IGodTreeState {
  treeList: ITreeNode[];
}

export interface ITreeNode {
  child: [],
  father: [],
  createTime: string,
  targetId: string,
  comments: string,
}

// interface
export interface IGodTreeContext
  extends IGodTreeActions,
    IContextValue {
  godTreeContextValue: IGodTreeState;
  godTreeContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function GodTreeContextProvider(props: any) {
  const initState: IGodTreeState = {
    treeList: []
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IGodTreeActions = useGodTreeGetActions(state, dispatch);

  const propsValue: IGodTreeContext = {
    ...action,
    godTreeContextValue: state,
    godTreeContextDispatch: dispatch
  };
  return <GodTreeContext.Provider value={propsValue} {...props} />;
}



// action types
export const godTreeReducerTypes = {
  setTreeList: "setTreeList"
};

// reducer
function reducer(state: IGodTreeState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case godTreeReducerTypes.setTreeList: {
      newState = {
        ...newState,
        treeList: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
