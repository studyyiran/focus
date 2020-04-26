import React, {
  useCallback,
  useRef,
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {seasonServer} from "../server";
import {ISeasonState, seasonReducerTypes} from "./index";

// @actions
export interface ISeasonActions {
  getTestAjaxValue: () => any;
}

// useCreateActions
export function useSeasonGetActions (
  state: ISeasonState,
  dispatch: (action: IReducerAction) => void
): ISeasonActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const getTestAjaxValue = useCallback(async function() {
    const res = await seasonServer.getTestAjaxResult();
    dispatch({
      type: seasonReducerTypes.setTestValue,
      value: res
    });
  }, [dispatch])
  return {
    getTestAjaxValue
  };
}