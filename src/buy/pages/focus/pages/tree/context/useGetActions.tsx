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
  return {
    getTreeList
  };
}