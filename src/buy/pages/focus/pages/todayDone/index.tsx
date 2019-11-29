import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";
import Button from "../../../../components/button";
import Svg from "../../../../components/svg";
import { NewTodoModal } from "../../components/newTodoModal";

export function TodayDone() {
  const myFocusContext = useContext(MyFocusContext);
  const [showModal, setShowModal] = useState(false);

  const {
    myFocusContextValue,
    getTodayDone,
    addTodayFinish,
    addTomorrowReview
  } = myFocusContext as IMyFocusContext;
  const { todayDoneList } = myFocusContextValue;
  useEffect(() => {
    getTodayDone();
  }, []);
  function renderList() {
    if (todayDoneList && todayDoneList.length) {
      return todayDoneList.map(item => {
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
      <ul>{renderList()}</ul>
      <Button
        onClick={() => {
          // 唤起弹框
          setShowModal(true);
        }}
      >
        <Svg icon="jia" />
        Quick Finish
      </Button>
      <NewTodoModal show={showModal} prevent={true} onSubmit={addTodayFinish} />
    </div>
  );
}
