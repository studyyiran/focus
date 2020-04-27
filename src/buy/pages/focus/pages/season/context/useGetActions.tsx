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
  addTodoIntoSeason: (info: any) => any;
  startNewSeason: (info: any) => any;
  getTodayLearnThing: () => any;
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
  const getSeasonList = useCallback(async function() {
    const res = await seasonServer.getSeasonList();
    dispatch({
      type: seasonReducerTypes.setSeasonList,
      value: res
    });
  }, [dispatch])
  const addTodoIntoSeason = useCallback(async function(info) {
    const res = await seasonServer.addTodoIntoSeason(info);
    dispatch({
      type: seasonReducerTypes.setSeasonList,
      value: res
    });
  }, [dispatch])
  const startNewSeason = useCallback(async function(info) {
    const res = await seasonServer.startNewSeason(info);
    dispatch({
      type: seasonReducerTypes.setSeasonList,
      value: res
    });
  }, [dispatch])


  const getTodayLearnThing = useCallback(async function() {
    const res = await studyToServer.getTodayLearnThing();
    dispatch({
      type: seasonReducerTypes.setTodayLearnThingList,
      value: res
    });
  }, [dispatch])

  return {
    getSeasonList,
    addTodoIntoSeason,
    getTodayLearnThing,
    startNewSeason
  };
}