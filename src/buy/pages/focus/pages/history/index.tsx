import React, { useContext, useEffect } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";

export function HistoryPage() {
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
    <div className="history-page">
      <ul></ul>
    </div>
  );
}
