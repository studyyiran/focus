import React, { useContext, useEffect } from "react";
import { Button } from "antd";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { IMyFocusContext, MyFocusContext } from "../../context";
import { TodoLine } from "../../components/ToDoLine";
import moment from "moment-timezone";
import "./index.less";

export function WishList() {
  const myFocusContext = useContext(MyFocusContext);
  const {
    getWishList,
    addWishList,
    myFocusContextValue
  } = myFocusContext as IMyFocusContext;
  useEffect(() => {
    getWishList();
  }, [getWishList]);
  const { wishList } = myFocusContextValue;
  const addNewTodoModal = useShowNewTodoModal({
    prevent: true,
    onSubmit: addWishList
  });
  function renderList() {
    const dom = wishList.map(item => {
      return (
        <div className="line-container">
          <TodoLine key={item._id} {...item} />
          <span>{moment(Number(item.createTime)).format("LLLL")}</span>
          <Button onClick={() => {}}>Move Into Plane</Button>
        </div>
      );
    });
    return <ul className="ul-line-container">{dom}</ul>;
  }
  return (
    <div className="wish-list">
      {renderList()}
      <Button onClick={addNewTodoModal}>add</Button>
    </div>
  );
}
