import React, {
  useCallback,
  useRef,
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {godTreeServer} from "../server";
import {IGodTreeState, godTreeReducerTypes} from "./index";

// @actions
export interface IGodTreeActions {
  getTestAjaxValue: () => any;
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
  const getTestAjaxValue = useCallback(async function() {
    const res = await godTreeServer.getTestAjaxResult();
    dispatch({
      type: godTreeReducerTypes.setTestValue,
      value: res
    });
  }, [dispatch])
  return {
    getTestAjaxValue
  };
}