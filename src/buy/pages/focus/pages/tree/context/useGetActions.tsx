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
  changeTargetNodePoint: ({containerNodeId, treeNodeId, treeNodeKeyName: string}: {containerNodeId: string, treeNodeId: string, treeNodeKeyName: string}) => any;
  getTreeShape: () => any;
  changeTreeShape: (info: any) => any;
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
  const changeTargetNodePoint = useCallback(async function(info) {
    const res = await godTreeServer.changeTargetNodePoint(info);
    // 更新treeShape
    dispatch({
      type: godTreeReducerTypes.setTreeShape,
      value: res
    });

  }, [dispatch])

  const getTreeShape = useCallback(async function() {
    const res = await godTreeServer.getTreeShape();
    dispatch({
      type: godTreeReducerTypes.setTreeShape,
      value: res
    });
  }, [dispatch])
  const changeTreeShape = useCallback(async function(data) {
    const res = await godTreeServer.changeTreeShape(data);
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