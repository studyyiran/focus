import React, { useContext, useEffect } from "react";
import { MyFocusContext } from "../../../../context";

interface IUsePostNewItemHandler {}

export const usePostNewItemHandler = (props?: IUsePostNewItemHandler) => {
  // 修改testValue
  // 修改StoreTestName
  // 引入context
  const myFocusContext = useContext(MyFocusContext);
  const { addTodayTodo } = myFocusContext;
  // local发起请求
  return (v: any) => {
      console.log(v)
    addTodayTodo(v);
  };
};
