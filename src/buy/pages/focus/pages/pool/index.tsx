import React, { useContext } from "react";
import { Button } from "antd";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { IMyFocusContext, MyFocusContext } from "../../context";

export function WishList() {
  const myFocusContext = useContext(MyFocusContext);
  const { addWishList } = myFocusContext as IMyFocusContext;
  const addNewTodoModal = useShowNewTodoModal({
    prevent: true,
    onSubmit: addWishList
  });
  return <Button onClick={addNewTodoModal}>add</Button>;
}
