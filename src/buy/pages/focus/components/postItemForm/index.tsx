import React, { useContext } from "react";
import "./index.less";
import { FormWrapper } from "../formWrapper";
import { IMyFocusContext, MyFocusContext } from "../../context";

export default function PostItemForm(props: any) {
  const { formConfig, onSubmit, id, prevent = false } = props;
  const myFocusContext = useContext(MyFocusContext);
  const { addTodayTodo, changeItemContent } = myFocusContext as IMyFocusContext;
  function onSubmitHandler(values: any) {
    if (prevent && onSubmit) {
      // 执行自定义逻辑
      onSubmit();
    } else {
      // 这块是修改和新增两用
      if (props.id) {
        // 修改
        changeItemContent({
          ...values,
          id: id
        });
      } else {
        console.log(myFocusContext);
        // 新增
        addTodayTodo(values);
      }
      onSubmit && onSubmit();
    }
  }
  return (
    <div className="post-item-form">
      <FormWrapper formConfig={formConfig} onSubmit={onSubmitHandler} />
    </div>
  );
}
