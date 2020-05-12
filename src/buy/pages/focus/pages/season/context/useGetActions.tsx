import React, {
  useCallback,
  useRef,
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {seasonServer} from "../server";
import {ISeasonState, seasonReducerTypes} from "./index";
import studyToServer from "../../../server";

// @actions
export interface ISeasonActions {
  getSeasonList: () => any;
  // getSeasonNotDoingList: () => any;
  addTodoIntoSeason: (info: any) => any;
  startNewSeason: (info: any) => any;
  getTodayLearnThing: () => any;
  // getStudyBuffRecord: () => any;
  finishSeason: (info: any) => any;
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

  function splitSeasonByStatus (res: any) {
    let arr1 : any[] = [];
    let arr2 : any[] = []
    res.forEach((item: any) => {
      if (item.status === 'doing') {
        arr1.push(item)
      } else {
        arr2.push(item)
      }
    })
    dispatch({
      type: seasonReducerTypes.setSeasonList,
      value: arr1
    });
    dispatch({
      type: seasonReducerTypes.setSeasonNotDoingList,
      value: arr2
    });
  }

  const addTodoIntoSeason = useCallback(async function(info) {
    const res = await seasonServer.addTodoIntoSeason(info);
    splitSeasonByStatus(res)
    // 更新today列表
    seasonActionsObj.getTodayLearnThing()
  }, [dispatch])

  const startNewSeason = useCallback(async function(info) {
    const res = await seasonServer.startNewSeason(info);
    splitSeasonByStatus(res)
  }, [dispatch])



  // const getStudyBuffRecord = useCallback(async function() {
    // const res = await seasonServer.getStudyBuffRecord();
    // dispatch({
    //   type: seasonReducerTypes.setBuffRecord,
    //   value: res
    // });
  // }, [dispatch])
  const seasonActionsObj = {
    getTodayLearnThing: useCallback(async function() {
      const res = await studyToServer.getTodayLearnThing();
      dispatch({
        type: seasonReducerTypes.setTodayLearnThingList,
        value: res
      });
    }, [dispatch]),
    getSeasonList: useCallback(async function() {
      const res = await seasonServer.getSeasonList({});
      splitSeasonByStatus(res)
    }, [dispatch]),
    // getSeasonNotDoingList: useCallback(async function() {
      // const res = await seasonServer.getSeasonList({status: "finish"});
      // dispatch({
      //   type: seasonReducerTypes.setSeasonList,
      //   value: res
      // });
    // }, [dispatch]),
    // getStudyBuffRecord,
    addTodoIntoSeason,
    startNewSeason,
    finishSeason: useCallback(async function(info) {
      const res = await seasonServer.finishSeason(info);
      splitSeasonByStatus(res)
    }, [dispatch]),
  };
  return seasonActionsObj
}