import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";
import { TodoLine } from "../../components/ToDoLine";
import { Button } from "antd";
import Modal from "../../../../components/modal";

export function HistoryPage() {
  const storeTestNameContext = useContext(MyFocusContext);
  const [currentInfo, setCurrentInfo] = useState({});
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
    if (historyList && historyList.length) {
      return historyList.map(info => {
        return (
          <div className={"todo-line-wrapper"}>
            <TodoLine {...info} />
            <Button
              onClick={() => {
                console.log(info);
                setCurrentInfo(info);
              }}
            >
              Action
            </Button>
          </div>
        );
      });
    } else {
      return null;
    }
  }
  return (
    <div className="history-page">
      <SettingModal
        currentInfo={currentInfo}
        onCancel={() => {
          setCurrentInfo({});
        }}
      />
      <ul>{renderList()}</ul>
    </div>
  );
}

function SettingModal(props: any) {
  const myFocusContext = useContext(MyFocusContext);
  const { deleteItem, changeItemContent } = myFocusContext as IMyFocusContext;
  const { currentInfo, onCancel } = props;
  const visible = currentInfo && currentInfo._id;
  return (
    <div>
      <Modal
        maskClosable={true}
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <ul>
          <li onClick={() => {

          }}>edit</li>
          <li onClick={deleteItem.bind({}, currentInfo._id)}>delete</li>
          <li>add into</li>
        </ul>
      </Modal>
    </div>
  );
}
