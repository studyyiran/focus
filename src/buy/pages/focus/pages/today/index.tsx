import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { Button, Select } from "antd";
import { TodayPageSection } from "../../components/todayPageSection";
import { IMyFocusContext, MyFocusContext } from "../../context";
import Svg from "../../../../components/svg";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { TodoLine } from "../../components/ToDoLine";
import { callBackWhenPassAllFunc } from "../../../../common/utils/util";
import { IListItem } from "../../context/interface";

export function FocusToday() {
  const myFocusContext = useContext(MyFocusContext);
  const {
    myFocusContextValue,
    getTodayTodo,
    changeStudyItemStatus,
    addTomorrowTodo
  } = myFocusContext as IMyFocusContext;
  const { todayTodo } = myFocusContextValue;

  useEffect(() => {
    callBackWhenPassAllFunc([], getTodayTodo);
  }, [getTodayTodo]);

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
            <TodoLine {...item} />
          </li>
        );
      });
    }
  }

  return (
    <div className="test-page">
      <TodayPageSection title="Plane">
        <Button onClick={testFunc}>
          <Svg icon="jia" />
          Add Into Today Todo
        </Button>
        {todayTodo && todayTodo.plane && todayTodo.plane.length
          ? todayTodo.plane.map(item => {
              const { _id } = item;
              return (
                <li key={_id}>
                  <TodoLine {...item} />
                  <Button onClick={changeStudyItemStatus.bind({}, _id)}>
                    finish
                  </Button>
                </li>
              );
            })
          : null}
      </TodayPageSection>
      <TodayPageSection title="Review">
        {todayTodo && todayTodo.review && todayTodo.review.length
          ? todayTodo.review.map(item => {
              const { content, _id, tag } = item;
              return (
                <li key={_id}>
                  <TodoLine {...item} />
                  <Button onClick={changeStudyItemStatus.bind({}, _id)}>
                    finish
                  </Button>
                </li>
              );
            })
          : null}
      </TodayPageSection>
      <TodayPageSection title="Delay">
        {todayTodo && todayTodo.delay && todayTodo.delay.length
          ? todayTodo.delay.map(item => {
              const { content, _id } = item;
              return (
                <li key={_id}>
                  <TodoLine {...item} />
                  <Button onClick={changeStudyItemStatus.bind({}, _id)}>
                    finish
                  </Button>
                </li>
              );
            })
          : null}
      </TodayPageSection>

      <div>
        <h2>Tomorrow Plan</h2>
        <Button onClick={addTomorrowTodoModal}>Add Tomorrow TODO</Button>
        <ul className="ul-line-container">{renderList(todayTodo.tomorrow)}</ul>
      </div>
    </div>
  );
}
