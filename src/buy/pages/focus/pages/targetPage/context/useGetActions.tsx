import React, {
  useCallback,
  useRef,
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {targetInfoServer} from "../server";
import {ITargetInfoState, ITargetInfoReducerTypes} from "./index";


interface IAddNewTargetInfo {
  targetName: string
}

// @actions
export interface ITargetInfoActions {
  getTargetRelatedTodo: () => any;
  addNewTarget: (data: IAddNewTargetInfo) => any;
  getTargetList: () => any;
}

// useCreateActions
export function useTargetInfoGetActions (
  state: ITargetInfoState,
  dispatch: (action: IReducerAction) => void
): ITargetInfoActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const getTargetRelatedTodo = useCallback(async function() {
    const res = await targetInfoServer.getTargetRelatedTodo();
    dispatch({
      type: ITargetInfoReducerTypes.setTargetWithCountList,
      value: res
    });
  }, [dispatch])

  // 添加
  const addNewTarget = useCallback(async function(data) {
    const res = await targetInfoServer.addNewTarget(data);
    dispatch({
      type: ITargetInfoReducerTypes.setTargetWithCountList,
      value: res
    });
  }, [dispatch])


  const getTargetList = useCallback(async function() {
    const res = await targetInfoServer.getTargetList();
    dispatch({
      type: ITargetInfoReducerTypes.setTargetList,
      value: res
    });
  }, [dispatch])


  return {
    getTargetRelatedTodo,
    addNewTarget,
    getTargetList,
  };
}