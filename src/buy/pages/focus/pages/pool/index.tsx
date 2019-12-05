import React from "react";
import { Button } from "antd";
import { useShowNewTodoModal } from "../../components/newTodoModal";

export function WishList() {
  const addNewTodoModal = useShowNewTodoModal({prevent: true, onSubmit: () => {

    }});
  return <Button onClick={addNewTodoModal}>add</Button>;
}
