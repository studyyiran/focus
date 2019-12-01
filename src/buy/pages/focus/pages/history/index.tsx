import React, { useContext, useEffect } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";

export function Name() {
  const storeTestNameContext = useContext(MyFocusContext);
  const {
    myFocusContextValue,
    getHistoryByFilter
  } = storeTestNameContext as IMyFocusContext;
  useEffect(() => {
    getHistoryByFilter({});
  }, []);
  const { historyList } = myFocusContextValue;
  console.log(historyList);
  return (
    <div className="test-page">
      <h1>History</h1>
      <ul></ul>
    </div>
  );
}
