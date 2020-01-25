import React, {
  useCallback,
  useRef,
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {targetInfoServer} from "../server";
import {ITargetInfoState, ITargetInfoReducerTypes} from "./index";

// @actions
export interface ITargetInfoActions {
  getTestAjaxValue: () => any;
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
  const getTestAjaxValue = useCallback(async function() {
    const res = await targetInfoServer.getTargetRelatedTodo();
    dispatch({
      type: ITargetInfoReducerTypes.setTargetWithCountList,
      value: res
    });
  }, [dispatch])
  return {
    getTestAjaxValue
  };
}