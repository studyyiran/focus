import React, { useContext, useEffect } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";
import Button from "../../../../components/button";
import Svg from "../../../../components/svg";
import PostItemForm from "../../components/postItemForm";

export function TodayDone() {
  const myFocusContext = useContext(MyFocusContext);
  const {
    myFocusContextValue,
    getTodayDone,
    addTodayFinish
  } = myFocusContext as IMyFocusContext;
  const { todayDoneList } = myFocusContextValue;
  useEffect(() => {
    getTodayDone();
  }, []);
  function renderList() {
    if (todayDoneList && todayDoneList.length) {
      return todayDoneList.map(item => {
        const { content } = item;
        return <li>{content}</li>;
      });
    }
  }
  return (
    <div className="test-page">
      <ul>{renderList()}</ul>
      <Button
        onClick={() => {
          // 唤起弹框
        }}
      >
        <Svg icon="jia" />
        Quick Finish
      </Button>
    </div>
  );
}
