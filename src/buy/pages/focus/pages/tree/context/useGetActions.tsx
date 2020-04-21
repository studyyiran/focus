import React, {
  useCallback,
  useRef,
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {godTreeServer} from "../server";
import {IGodTreeState, godTreeReducerTypes} from "./index";

// @actions
export interface IGodTreeActions {
  getTreeList: () => any;
  changeTargetNodePoint: ({treeId, targetNodeId}: {treeId: string, targetNodeId: string}) => any;
  getTreeShape: () => any;
  changeTreeShape: ({nextTreeShape}: {nextTreeShape: any}) => any;
}

// useCreateActions
export function useGodTreeGetActions (
  state: IGodTreeState,
  dispatch: (action: IReducerAction) => void
): IGodTreeActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const getTreeList = useCallback(async function() {
    const res = await godTreeServer.getTreeList();
    dispatch({
      type: godTreeReducerTypes.setTreeList,
      value: res
    });
  }, [dispatch])
  const changeTargetNodePoint = useCallback(async function({treeId, targetNodeId}) {
    const res = await godTreeServer.changeTargetNodePoint({treeId, targetNodeId});
    dispatch({
      type: godTreeReducerTypes.setTreeList,
      value: res
    });
  }, [dispatch])

  const getTreeShape = useCallback(async function() {
    const res = await godTreeServer.getTreeShape();
    dispatch({
      type: godTreeReducerTypes.setTreeList,
      value: res
    });
  }, [dispatch])
  const changeTreeShape = useCallback(async function(nextTreeShape) {
    const res = await godTreeServer.changeTreeShape(nextTreeShape);
    dispatch({
      type: godTreeReducerTypes.setTreeShape,
      value: res
    });
  }, [dispatch])
  return {
    getTreeList,
    changeTargetNodePoint,
    getTreeShape,
    changeTreeShape,
  };
}