import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";
import { TodoLine } from "../../components/ToDoLine";
import { Button } from "antd";
import Modal from "../../../../components/modal";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { IListItem } from "../../context/interface";

export function HistoryPage() {
  const storeTestNameContext = useContext(MyFocusContext);
  const [currentInfo, setCurrentInfo] = useState({});
  const {
    myFocusContextValue,
    getHistoryByFilter,
    addTodayTodo
  } = storeTestNameContext as IMyFocusContext;
  useEffect(() => {
    getHistoryByFilter({});
  }, []);
  const { historyList } = myFocusContextValue;

  // 根据选项来进行筛选（暂时写死hidden）
  function listFilter(list: IListItem[]) {
    return list.filter(item => {
      return item && !item.hidden;
    });
  }

  function renderList(list: IListItem[]) {
    if (list && list.length) {
      return list.map(info => {
        return (
          <div className={"todo-line-wrapper"} key={info._id}>
            <TodoLine {...info} />
            <Button
              onClick={() => {
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
        addTodayTodo={addTodayTodo}
        currentInfo={currentInfo}
        onCancel={() => {
          setCurrentInfo({});
        }}
      />
      <ul>{renderList(listFilter(historyList))}</ul>
    </div>
  );
}

function SettingModal(props: any) {
  const myFocusContext = useContext(MyFocusContext);
  const { deleteItem } = myFocusContext as IMyFocusContext;
  const { currentInfo, onCancel, addTodayTodo } = props;
  const visible = currentInfo && currentInfo._id;

  const openEditModal = useShowNewTodoModal(currentInfo);
  const openAddAsTodayModal = useShowNewTodoModal({
    ...currentInfo,
    prevent: true,
    onSubmit: (values: any) => {
      console.log(values);
      addTodayTodo(values);
    }
  });

  return (
    <div>
      <Modal
        maskClosable={true}
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <ul>
          <li onClick={openEditModal}>edit</li>
          <li
            onClick={() => {
              deleteItem(currentInfo._id);
              onCancel();
            }}
          >
            delete
          </li>
          <li onClick={openAddAsTodayModal}>add as today</li>
        </ul>
      </Modal>
    </div>
  );
}
