import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { Button, Select } from "antd";
import { TodayPageSection } from "../../components/todayPageSection";
import { IMyFocusContext, MyFocusContext } from "../../context";
import Svg from "../../../../components/svg";
import { callBackWhenPassAllFunc } from "../../../../common/utils/util";
import {showNewTodoModal} from "../../components/newTodoModal";


export function FocusToday() {
  const myFocusContext = useContext(MyFocusContext);
  const {
    getTodayTodo,
    myFocusContextValue,
    deleteItem,
    changeStudyItemStatus
  } = myFocusContext as IMyFocusContext;
  const { todayTodo } = myFocusContextValue;

  useEffect(() => {
    // 1 当前页面
    // 2 d
    callBackWhenPassAllFunc([], getTodayTodo);
  }, [getTodayTodo]);

  return (
    <div className="test-page">
      <TodayPageSection title="Plane">
        {todayTodo && todayTodo.plane && todayTodo.plane.length
          ? todayTodo.plane.map(item => {
              const { content, _id } = item;
              return (
                <li key={_id}>
                  <span>{content}</span>
                  <Button
                    onClick={() => {
                      deleteItem(_id);
                    }}
                  >
                    delete
                  </Button>
                  <Button onClick={changeStudyItemStatus.bind({}, _id)}>
                    finish
                  </Button>
                </li>
              );
            })
          : null}
        <div>
          <Button
            onClick={() => {
              showNewTodoModal();
            }}
          >
            <Svg icon="jia" />
            Add Into Today Todo
          </Button>
        </div>
      </TodayPageSection>
      <TodayPageSection title="Review">
        {todayTodo && todayTodo.review && todayTodo.review.length
          ? todayTodo.review.map(item => {
              const { content, _id } = item;
              return (
                <li key={_id}>
                  <span>{content}</span>
                  <Button
                    onClick={() => {
                      deleteItem(_id);
                    }}
                  >
                    delete
                  </Button>
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
                  <span>{content}</span>
                  <Button
                    onClick={() => {
                      deleteItem(_id);
                    }}
                  >
                    delete
                  </Button>
                  <Button onClick={changeStudyItemStatus.bind({}, _id)}>
                    finish
                  </Button>
                </li>
              );
            })
          : null}
      </TodayPageSection>
    </div>
  );
}
