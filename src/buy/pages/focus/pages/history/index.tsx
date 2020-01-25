import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { IMyFocusContext, MyFocusContext } from "../../context";
import { TodoLine } from "../../components/ToDoLine";
import { Button, Select } from "antd";
import Modal from "../../../../components/modal";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { IListItem } from "../../context/interface";
import moment from "moment";
import { FilterPart } from "./components/filterPart";
import { TargetInfoContext } from "../targetPage/context";
const { Option } = Select;

export function HistoryPage() {
  const storeTestNameContext = useContext(MyFocusContext);
  const [currentInfo, setCurrentInfo] = useState({});
  const {
    myFocusContextValue,
    getHistoryByFilter,
    addTodayTodo
  } = storeTestNameContext as IMyFocusContext;

  const { historyList } = myFocusContextValue;

  useEffect(() => {
    getHistoryByFilter();
  }, [getHistoryByFilter]);

  // 根据选项来进行筛选（暂时写死hidden）
  // function listFilter(list: IListItem[]) {
  //   return list.filter(item => {
  //     return item && !item.hidden;
  //   });
  // }
  function renderList(list: IListItem[]) {
    if (list && list.length) {
      return list.map(info => {
        return (
          <li
            className={"todo-line-wrapper"}
            key={info._id}
            data-finish={!(info.planStartTime && !info.finishDate)}
          >
            <TodoLine {...info} />
            {info.finishDate
              ? moment(info.finishDate).format("LLLL")
              : moment(info.createTime).format("LLLL")}
            <Button
              onClick={() => {
                setCurrentInfo(info);
              }}
            >
              Action
            </Button>
          </li>
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
      <FilterPart />
      <ul className="ul-line-container">{renderList(historyList)}</ul>
    </div>
  );
}

function SettingModal(props: any) {
  const targetInfoContext = useContext(TargetInfoContext);
  const { targetInfoContextValue, addTargetRelate } = targetInfoContext;
  const { targetList } = targetInfoContextValue;
  const myFocusContext = useContext(MyFocusContext);
  const { deleteItem } = myFocusContext as IMyFocusContext;
  const { currentInfo, onCancel, addTodayTodo } = props;
  const visible = currentInfo && currentInfo._id;
  const {haveRelated} = currentInfo

  const openEditModal = useShowNewTodoModal(currentInfo);
  const openAddAsTodayModal = useShowNewTodoModal({
    ...currentInfo,
    tag: "review",
    prevent: true,
    onSubmit: (values: any) => {
      addTodayTodo(values);
    }
  });

  const openAddIntoTargetModal = useShowNewTodoModal({
    formConfig: [
      {
        id: "targetId",
        initialValue: "",
        rules: [
          {
            required: true,
            message: "not empty"
          }
        ],
        renderFormEle: () => (
          <Select>
            {targetList.map(({targetName, _id}) => {
              return (
                <Option value={_id} key={_id}>
                  {targetName}
                </Option>
              );
            })}
          </Select>
        )
      },
      {
        renderFormEle: () => <Button htmlType="submit">submit</Button>
      }
    ],
    prevent: true,
    onSubmit: (values: any) => {
      const {targetId} = values
      const todoId = currentInfo._id
      addTargetRelate({
        targetId,
        todoId
      })
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
          {!haveRelated ? <li onClick={openAddIntoTargetModal}>add into target</li> : null}
        </ul>
      </Modal>
    </div>
  );
}
