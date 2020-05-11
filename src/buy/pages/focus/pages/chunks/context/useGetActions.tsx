import React, { useCallback, useRef } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { storeChunksServer } from "../server";
import { IStoreChunksState, storeChunksReducerTypes } from "./index";

// @actions
export interface IStoreChunksActions {
  getTestAjaxValue: () => any;
}

// useCreateActions
export function useStoreChunksGetActions(
  state: IStoreChunksState,
  dispatch: (action: IReducerAction) => void
) : IStoreChunksActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  return {
    getTestAjaxValue: useCallback(
      async function() {
        const res = await storeChunksServer.getAllChunks();
        dispatch({
          type: storeChunksReducerTypes.setChunksList,
          value: res
        });
      },
      [dispatch]
    )
  };
}
