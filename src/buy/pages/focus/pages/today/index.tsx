import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { Button, Select } from "antd";
import { TodayPageSection } from "../../components/todayPageSection";
import { IMyFocusContext, MyFocusContext } from "../../context";
import Svg from "../../../../components/svg";
import {
  useShowNewTodoModal
} from "../../components/newTodoModal";
import { TodoLine } from "../../components/ToDoLine";

export function FocusToday() {
  const myFocusContext = useContext(MyFocusContext);
  const {
    myFocusContextValue,
    changeStudyItemStatus
  } = myFocusContext as IMyFocusContext;
  const { todayTodo } = myFocusContextValue;

  const testFunc = useShowNewTodoModal({});

  return (
    <div className="test-page">
      <TodayPageSection title="Plane">
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
        <Button onClick={testFunc}>
          <Svg icon="jia" />
          Add Into Today Todo
        </Button>
      </div>
    </div>
  );
}
