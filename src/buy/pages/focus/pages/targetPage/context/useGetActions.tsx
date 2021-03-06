import React, { useCallback, useContext, useRef } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { targetInfoServer } from "../server";
import { ITargetInfoState, ITargetInfoReducerTypes } from "./index";
import { MyFocusContext } from "../../../context";
import { UserSunnyContext } from "../../../context/sunny";

interface IAddNewTargetInfo {
  targetName: string;
}

interface IAddTargetRelated {
  targetId: string;
  todoId: string;
}

// @actions
export interface ITargetInfoActions {
  // getTargetRelatedTodo: () => any;
  addNewTarget: (data: IAddNewTargetInfo) => any;
  getTargetList: () => any;
  getTargetListHaveFinish: () => any;
  addTargetRelate: (data: IAddTargetRelated) => any;
  targetLevelUp: (data: ITargetLevelUpJson) => any;
  setCurrentTargetInfo: (_id?: string) => any;
}

export interface ISubTargetLevelUpJson {
  isPass?: boolean;
  targetId: string;
  comments: string; // levelup,tree,finalComments的字段
  type: string;
}

export interface ITargetLevelUpJson {
  targetArr: ISubTargetLevelUpJson[];
}

// useCreateActions
export function useTargetInfoGetActions(
  state: ITargetInfoState,
  dispatch: (action: IReducerAction) => void
): ITargetInfoActions {
  // const myFocusContext = useContext(MyFocusContext);
  // const { getHistoryByFilter, getRelatedTodoList } = myFocusContext;

  const userSunnyContext = useContext(UserSunnyContext);
  const { getUserSunny } = userSunnyContext;
  // const getTargetRelatedTodo = useCallback(
  //   async function() {
  //     const res = await targetInfoServer.getTargetRelatedTodo();
  //   },
  //   [dispatch]
  // );

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
      getUserSunny();
    },
    [getTargetList, getUserSunny]
  );

  // 关联
  const addTargetRelate = useCallback(async function(data) {
    // 1 发起关联
    const res = await targetInfoServer.addTargetRelate(data);
    // 2 更新history
    // getHistoryByFilter();
    // getRelatedTodoList();
  }, []);

  // 关联
  const targetLevelUp = useCallback(
    async function(data) {
      // 1 发起关联
      // 简单屏蔽掉多次ajax
      if (data && data.targetArr && data.targetArr.length) {
        const res = await targetInfoServer.targetLevelUp(data);
        getUserSunny();
        // 2 更新history
        dispatch({
          type: ITargetInfoReducerTypes.setTargetList,
          value: res
        });
      }
    },
    [dispatch, getUserSunny]
  );

  // 关联
  const getTargetListHaveFinish = useCallback(
    async function() {
      const res = await targetInfoServer.getTargetListHaveFinish();
      dispatch({
        type: ITargetInfoReducerTypes.setTargetListHaveFinish,
        value: res
      });
    },
    [dispatch]
  );

  return {
    // getTargetRelatedTodo,
    addNewTarget,
    getTargetList,
    getTargetListHaveFinish,
    addTargetRelate,
    targetLevelUp,
    setCurrentTargetInfo: targetId => {
      if (targetId) {
        const target = state.targetList.find(({ _id }) => {
          return _id === targetId;
        });
        if (target) {
          dispatch({
            type: ITargetInfoReducerTypes.setCurrentTargetInfo,
            value: target
          });
        } else {
          dispatch({
            type: ITargetInfoReducerTypes.setCurrentTargetInfo,
            value: {}
          });
        }
      } else {
        dispatch({
          type: ITargetInfoReducerTypes.setCurrentTargetInfo,
          value: {}
        });
      }
    }
  };
}
