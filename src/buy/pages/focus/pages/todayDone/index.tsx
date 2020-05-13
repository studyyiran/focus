import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";
import Svg from "../../../../components/svg";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { IListItem } from "../../context/interface";
import { Button } from "antd";
import { TodoLine } from "../../components/ToDoLine";
import { TodayPageSection } from "../today/components/todayPageSection";

export function TodayDone() {
  const myFocusContext = useContext(MyFocusContext);
  const [showModal, setShowModal] = useState(false);
  const [showTomorrowModal, setShowTomorrowModal] = useState(false);
  const {
    myFocusContextValue,
    getTodayDone,
    addTodayFinish,
    addTomorrowReview,
    addTomorrowTodo,
    getTodayTodo
  } = myFocusContext as IMyFocusContext;
  const { todayDoneList, todayTodo } = myFocusContextValue;
  useEffect(() => {
    getTodayDone();
    getTodayTodo();
  }, [getTodayDone, getTodayTodo]);

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
          <li key={_id}>
            <TodoLine {...item} />
            {/*<Button*/}
            {/*  onClick={() => {*/}
            {/*    addTomorrowReview(content);*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Svg icon="jia" />*/}
            {/*  Add Into Tomorrow Review*/}
            {/*</Button>*/}
          </li>
        );
      });
    }
  }
  return (
    <div className="today-done">
      <Button onClick={addTomorrowTodoModal}>Add Tomorrow TODO</Button>
      {todayDoneList && todayDoneList.length ? (
        <TodayPageSection title="已完成">
          {renderList(todayDoneList)}
        </TodayPageSection>
      ) : null}
      {todayTodo && todayTodo.tomorrow && todayTodo.tomorrow.length ? (
        <TodayPageSection title="明天">
          {renderList(todayTodo.tomorrow)}
        </TodayPageSection>
      ) : null}
    </div>
  );
}
