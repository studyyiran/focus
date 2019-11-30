import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { Button, Select } from "antd";
import { TodayPageSection } from "../../components/todayPageSection";
import { IMyFocusContext, MyFocusContext } from "../../context";
import Svg from "../../../../components/svg";
import { callBackWhenPassAllFunc } from "../../../../common/utils/util";
import { NewTodoModal } from "../../components/newTodoModal";

export function FocusToday() {
  const myFocusContext = useContext(MyFocusContext);
  const [showModal, setShowModal] = useState(false);
  const {
    getTodayTodo,
    myFocusContextValue,
    deleteItem,
    changeStudyItemStatus
  } = myFocusContext as IMyFocusContext;
  const { todayTodo } = myFocusContextValue;

  return (
    <div className="test-page">
      <h1>Focus Today</h1>
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
      <div>
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          <Svg icon="jia" />
          Add Into Today Todo
        </Button>
      </div>
      <NewTodoModal
        show={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
}
