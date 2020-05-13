import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { Button, Select } from "antd";
import { TodayPageSection } from "./components/todayPageSection";
import { IMyFocusContext, MyFocusContext } from "../../context";
import Svg from "../../../../components/svg";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { TodoLine } from "../../components/ToDoLine";
import { callBackWhenPassAllFunc } from "../../../../common/utils/util";
import { IListItem } from "../../context/interface";
import { sunnyType } from "../../config/tagArrConfig";

export function FocusToday() {
  const myFocusContext = useContext(MyFocusContext);
  const {
    myFocusContextValue,
    getTodayTodo,
    changeStudyItemStatus,
    addTomorrowTodo,
    getTodayDone
  } = myFocusContext as IMyFocusContext;
  const { todayTodo, todayDoneList } = myFocusContextValue;

  useEffect(() => {
    getTodayDone();
    getTodayTodo();
  }, [getTodayDone, getTodayTodo]);

  const testFunc = useShowNewTodoModal({});

  const addTomorrowTodoModal = useShowNewTodoModal({
    prevent: true,
    onSubmit: addTomorrowTodo
  });

  function renderList(list: IListItem[]) {
    if (list && list.length) {
      return list.map(item => {
        const { content, tag, _id } = item;
        return (
          <li key={_id} className="line">
            <TodoLine {...item} onClickButton1={changeStudyItemStatus} />
          </li>
        );
      });
    }
  }

  return (
    <div className="test-page">
      <Button onClick={testFunc}>
        <Svg icon="jia" />
        Add Into Today Todo({sunnyType.todo})
      </Button>
      {todayTodo && todayTodo.plane && todayTodo.plane.length ? (
        <TodayPageSection title="今天">
          {todayTodo.plane.map(item => {
            const { _id } = item;
            return (
              <li key={_id}>
                <TodoLine {...item} onClickButton1={changeStudyItemStatus} />
              </li>
            );
          })}
        </TodayPageSection>
      ) : null}

      {todayTodo && todayTodo.review && todayTodo.review.length ? (
        <TodayPageSection title="复习">
          {todayTodo.review.map(item => {
            const { content, _id, tag } = item;
            return (
              <li key={_id}>
                <TodoLine {...item} onClickButton1={changeStudyItemStatus} />
              </li>
            );
          })}
        </TodayPageSection>
      ) : null}

      {todayTodo && todayTodo.delay && todayTodo.delay.length ? (
        <TodayPageSection title="已过期">
          {todayTodo.delay.map(item => {
            const { content, _id } = item;
            return (
              <li key={_id}>
                <TodoLine {...item} onClickButton1={changeStudyItemStatus} />
              </li>
            );
          })}
        </TodayPageSection>
      ) : null}
      {todayDoneList && todayDoneList.length ? (
        <TodayPageSection title="完成" haveDone={true}>
          {todayDoneList.map(item => {
            return (
              <li key={item._id}>
                <TodoLine
                  haveDone={true}
                  {...item}
                  onClickButton1={changeStudyItemStatus}
                />
              </li>
            );
          })}
        </TodayPageSection>
      ) : null}
    </div>
  );
}
