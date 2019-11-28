import React, { useContext, useEffect } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";

export function TodayDone() {
  const myFocusContext = useContext(MyFocusContext);
  const {
    myFocusContextValue,
    getTodayDone
  } = myFocusContext as IMyFocusContext;
  const { todayDoneList } = myFocusContextValue;
  useEffect(() => {
    getTodayDone();
  }, []);
  console.log(todayDoneList)
  return <div className="test-page">123</div>;
}
