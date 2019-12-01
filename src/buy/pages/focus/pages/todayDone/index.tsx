import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";
import Button from "../../../../components/button";
import Svg from "../../../../components/svg";
import { NewTodoModal } from "../../components/newTodoModal";
import { IListItem } from "../../context/interface";

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
  console.log(todayTodo);
  function renderList(list: IListItem[]) {
    if (list && list.length) {
      return list.map(item => {
        const { content, tag } = item;
        return (
          <li>
            <span>《{tag}》</span>
            <span>{content}</span>
            <Button
              onClick={() => {
                addTomorrowReview({
                  content: content,
                  tag: "review"
                });
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
    <div className="test-page">
      <div>
        <h2>Today Done</h2>
        <ul>{renderList(todayDoneList)}</ul>
        <Button
          onClick={() => {
            // 唤起弹框
            setShowModal(true);
          }}
        >
          <Svg icon="jia" />
          Quick Finish
        </Button>
        <NewTodoModal
          onCancel={() => {
            setShowModal(false);
          }}
          show={showModal}
          prevent={true}
          onSubmit={addTodayFinish}
        />
      </div>

      <div>
        <h2>Tomorrow Plan</h2>
        <ul>{renderList(todayTodo.tomorrow)}</ul>
        <Button
          onClick={() => {
            setShowTomorrowModal(true);
          }}
        >
          Add Tomorrow TODO
        </Button>
        <NewTodoModal
          onCancel={() => {
            setShowTomorrowModal(false);
          }}
          show={showTomorrowModal}
          prevent={true}
          onSubmit={(data: any) => {
            addTomorrowTodo(data);
          }}
        />
      </div>
    </div>
  );
}
