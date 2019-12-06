import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "antd";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { IMyFocusContext, MyFocusContext } from "../../context";
import { TodoLine } from "../../components/ToDoLine";
import moment from "moment-timezone";
import "./index.less";
import { ITodoItem } from "../../context/interface";

export function WishList() {
  const myFocusContext = useContext(MyFocusContext);
  const [currentTodo, setCurrentTodo] = useState({} as ITodoItem);
  const {
    changeTodoItem,
    getWishList,
    addWishList,
    myFocusContextValue
  } = myFocusContext as IMyFocusContext;
  useEffect(() => {
    getWishList();
  }, [getWishList]);
  const { wishList } = myFocusContextValue;
  const addWishListModal = useCallback(
    useShowNewTodoModal({
      prevent: true,
      onSubmit: addWishList
    }),
    []
  );
  const quickChangeTodoItem = (todo: ITodoItem) => {
    changeTodoItem({
      ...todo,
      timeType: "today"
    });
  };

  const slowChangeTodoItemModal = useShowNewTodoModal({
    ...currentTodo,
    prevent: true,
    onSubmit: (todo: ITodoItem) => {
      setCurrentTodo({} as any);
      changeTodoItem({
        ...currentTodo,
        ...todo,
        timeType: "tomorrow"
      });
    }
  });

  // 当有值的时候
  useEffect(() => {
    if (currentTodo && currentTodo.content) {
      slowChangeTodoItemModal();
    }
  }, [currentTodo, slowChangeTodoItemModal]);

  function renderList() {
    const dom = wishList.map(item => {
      return (
        <div className="line-container" key={item._id}>
          <TodoLine {...item} />
          <span>
            {(
              moment(Number(item.createTime)) || moment(item.createTime)
            ).format("LLLL")}
          </span>
          <div>
            <Button
              onClick={() => {
                quickChangeTodoItem(item);
              }}
            >
              Quick add today
            </Button>
            <Button onClick={() => setCurrentTodo(item)}>Slow add Plan</Button>
          </div>
        </div>
      );
    });
    return <ul className="ul-line-container">{dom}</ul>;
  }
  return (
    <div className="wish-list">
      {renderList()}
      <Button onClick={addWishListModal}>add</Button>
    </div>
  );
}
