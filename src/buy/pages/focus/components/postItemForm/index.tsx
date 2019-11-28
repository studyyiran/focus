import React, { useContext } from "react";
import "./index.less";
import { FormWrapper } from "../formWrapper";
import {IMyFocusContext, MyFocusContext} from "../../context";

export default function PostItemForm(props: any) {
  const { formConfig, onSubmit, id, show } = props;
  const myFocusContext = useContext(MyFocusContext);
  const {
    addTodayTodo,
    changeItemContent
  } = myFocusContext as IMyFocusContext;
  function onSubmitHandler(values: any) {
    // 这块是修改和新增两用
    if (props.id) {
      changeItemContent({
        ...values,
        id: props.id
      });
    } else {
      addTodayTodo(values);
    }
    onSubmit && onSubmit();
  }
  if (show) {
    return (
      <div className="post-item-form">
        <FormWrapper formConfig={formConfig} onSubmit={onSubmitHandler} />
      </div>
    );
  } else {
    return null;
  }
}
