import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";
import Svg from "../../../../components/svg";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { IListItem } from "../../context/interface";
import { Button } from "antd";
import { TodoLine } from "../../components/ToDoLine";

export function TodayDone() {
  const myFocusContext = useContext(MyFocusContext);
  const [showModal, setShowModal] = useState(false);
  const [showTomorrowModal, setShowTomorrowModal] = useState(false);
  const {
    myFocusContextValue,
    getTodayDone,
    addTodayFinish,
    addTomorrowReview,
    addTomorrowTodo
  } = myFocusContext as IMyFocusContext;
  const { todayDoneList, todayTodo } = myFocusContextValue;
  useEffect(() => {
    getTodayDone();
  }, []);

  const quickFinishModal = useShowNewTodoModal({
    prevent: true,
    onSubmit: addTodayFinish
  });

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
            <Button
              onClick={() => {
                addTomorrowReview(content);
              }}
            >
              <Svg icon="jia" />
              Add Into Tomorrow Review
            </Button>
          </li>
        );
      });
    }
  }
  return (
    <div className="today-done">
      <div>
        <h2>Today Done</h2>
        <ul>{renderList(todayDoneList)}</ul>
        <Button onClick={quickFinishModal}>
          <Svg icon="jia" />
          Quick Finish
        </Button>
      </div>

      <div>
        <h2>Tomorrow Plan</h2>
        <ul>{renderList(todayTodo.tomorrow)}</ul>
        <Button onClick={addTomorrowTodoModal}>Add Tomorrow TODO</Button>
      </div>
    </div>
  );
}
