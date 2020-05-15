import React, { createContext, useReducer, useEffect } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { callBackWhenPassAllFunc } from "buy/common/utils/util";
import useReducerMiddleware from "buy/common/useHook/useReducerMiddleware";
import { IContextValue } from "buy/common/type";
import { useIsCurrentPage } from "buy/common/useHook";
import { IGodTreeActions, useGodTreeGetActions } from "./useGetActions";

export const GodTreeContext = createContext({} as IGodTreeContext);

// store name
export const GodTree = "GodTree";
// store state
export interface IGodTreeState {
  treeList: ITreeNode[];
  treeShape: any[];
}

export interface ITreeNode {
  _id: "";
  containerNodeId: "";
  createTime: string;
  targetId: string;
  comments: string;
}

// interface
export interface IGodTreeContext extends IGodTreeActions, IContextValue {
  godTreeContextValue: IGodTreeState;
  godTreeContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function GodTreeContextProvider(props: any) {
  const initState: IGodTreeState = {
    treeList: [],
    treeShape: []
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

  const { getTreeShape } = action;
  useEffect(() => {
    getTreeShape();
  }, [getTreeShape]);

  return <GodTreeContext.Provider value={propsValue} {...props} />;
}

// action types
export const godTreeReducerTypes = {
  setTreeList: "setTreeList",
  setTreeShape: "setTreeShape"
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
    case godTreeReducerTypes.setTreeShape: {
      newState = {
        ...newState,
        treeShape: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
