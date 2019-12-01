import React, { useContext, useEffect } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";
import { TodoLine } from "../../components/ToDoLine";
import { Button } from "antd";

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

  function renderList() {
    return historyList.map(info => {
      return (
        <div>
          <TodoLine {...info} />
          <Button>Action</Button>
        </div>
      );
    });
  }
  return (
    <div className="history-page">
      <ul>{}</ul>
    </div>
  );
}
