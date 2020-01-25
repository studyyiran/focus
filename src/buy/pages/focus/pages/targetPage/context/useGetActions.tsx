import React, { useCallback, useContext, useRef } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { targetInfoServer } from "../server";
import { ITargetInfoState, ITargetInfoReducerTypes } from "./index";
import { MyFocusContext } from "../../../context";

interface IAddNewTargetInfo {
  targetName: string;
}

interface IAddTargetRelated {
  targetId: string;
  todoId: string;
}

// @actions
export interface ITargetInfoActions {
  getTargetRelatedTodo: () => any;
  addNewTarget: (data: IAddNewTargetInfo) => any;
  getTargetList: () => any;
  addTargetRelate: (data: IAddTargetRelated) => any;
}

// useCreateActions
export function useTargetInfoGetActions(
  state: ITargetInfoState,
  dispatch: (action: IReducerAction) => void
): ITargetInfoActions {
  const myFocusContext = useContext(MyFocusContext);
  const { getHistoryByFilter } = myFocusContext;
  const getTargetRelatedTodo = useCallback(
    async function() {
      const res = await targetInfoServer.getTargetRelatedTodo();
      dispatch({
        type: ITargetInfoReducerTypes.setTargetWithCountList,
        value: res
      });
    },
    [dispatch]
  );

  // 更新基础列表。（这个口，还有相关字段，是否可以用count来代替？）
  const getTargetList = useCallback(
    async function() {
      const res = await targetInfoServer.getTargetList();
      dispatch({
        type: ITargetInfoReducerTypes.setTargetList,
        value: res
      });
    },
    [dispatch]
  );

  // 添加
  const addNewTarget = useCallback(
    async function(data) {
      const res = await targetInfoServer.addNewTarget(data);
      // 更新下xxx
      getTargetList();
      dispatch({
        type: ITargetInfoReducerTypes.setTargetWithCountList,
        value: res
      });
    },
    [dispatch]
  );

  // 关联
  const addTargetRelate = useCallback(
    async function(data) {
      // 1 发起关联
      const res = await targetInfoServer.addTargetRelate(data);
      // 2 更新history
      getHistoryByFilter();
    },
    [dispatch, getHistoryByFilter]
  );

  return {
    getTargetRelatedTodo,
    addNewTarget,
    getTargetList,
    addTargetRelate
  };
}
