import React, { useCallback, useRef } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { storeChunksServer } from "../server";
import { IStoreChunksState, storeChunksReducerTypes } from "./index";

// @actions
export interface IStoreChunksActions {
  getAllChunks: () => any;
  startNewChunks: (info: any) => any;
  addLearnRecord: (info: any) => any;
  changeOneRecord: (info: any) => any;
  getStudyBuffList: (info: any) => any;
}

// useCreateActions
export function useStoreChunksGetActions(
  state: IStoreChunksState,
  dispatch: (action: IReducerAction) => void
): IStoreChunksActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  return {
    getAllChunks: useCallback(
      async function() {
        const res = await storeChunksServer.getAllChunks();
        dispatch({
          type: storeChunksReducerTypes.setChunksList,
          value: res
        });
      },
      [dispatch]
    ),
    startNewChunks: useCallback(
      async function(info) {
        const res = await storeChunksServer.startNewChunks(info);
        dispatch({
          type: storeChunksReducerTypes.setChunksList,
          value: res
        });
      },
      [dispatch]
    ),
    addLearnRecord: useCallback(
      async function(info: any) {
          function getTime() {
              if (info && info.planDeadLineTime) {
                  return info.planDeadLineTime
              } else {
                if (info.status === 'TODO') {
                    return 'today'
                }
              }
          }
        const res = await storeChunksServer.addLearnRecord({...info, planDeadLineTime: getTime()});
        dispatch({
          type: storeChunksReducerTypes.setChunksList,
          value: res
        });
      },
      [dispatch]
    ),
    changeOneRecord: useCallback(
      async function(info) {
        const res = await storeChunksServer.changeOneRecord(info);
        dispatch({
          type: storeChunksReducerTypes.setChunksList,
          value: res
        });
      },
      [dispatch]
    ),
    getStudyBuffList: useCallback(
      async function() {
        const res = await storeChunksServer.getStudyBuffList();
        dispatch({
          type: storeChunksReducerTypes.setStudyBuffList,
          value: res
        });
      },
      [dispatch]
    )
  };
}
