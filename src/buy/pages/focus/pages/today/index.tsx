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
import { PostForm } from "./components/postForm";

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
      <PostForm />
      <div>Add Into Today Todo({sunnyType.todo})</div>
      <TodayPageSection
        title="今天"
        onClickButton1={changeStudyItemStatus}
        arr={todayTodo.plane}
      />
      <TodayPageSection
        title="复习"
        onClickButton1={changeStudyItemStatus}
        arr={todayTodo.review}
      />
      <TodayPageSection
        title="已过期"
        onClickButton1={changeStudyItemStatus}
        arr={todayTodo.delay}
      />
      <TodayPageSection haveDone={true} title="完成" arr={todayDoneList} />
    </div>
  );
}
