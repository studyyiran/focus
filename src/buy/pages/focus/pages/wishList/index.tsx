import React, { useContext, useEffect } from "react";
import { Button } from "antd";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { IMyFocusContext, MyFocusContext } from "../../context";

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
``  console.log("test");
  console.log(wishList);
  return <Button onClick={addNewTodoModal}>add</Button>;
}
