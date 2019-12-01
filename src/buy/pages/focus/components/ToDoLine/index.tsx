import React, { useContext, useEffect } from "react";
import "./index.less";
import { tagArr } from "../newTodoModal";

export function TodoLine(props: any) {
  const { tag, content } = props;
  const findTarget = (tagArr as any).find((tagItem: any) => {
    return tagItem.value === tag;
  });
  return (
    <>
      <span>《{findTarget ? findTarget.name : tag}》</span>
      <span>{content}</span>
    </>
  );
}
