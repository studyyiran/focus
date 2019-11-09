import React, { useContext } from "react";
import "./index.less";
import { FormWrapper } from "../formWrapper";
import { EntryPageContext, IEntryPageContext } from "../../context";

export default function PostItemForm(props: any) {
  const { formConfig, onSubmit, id, show } = props;
  const entryPageContext = useContext(EntryPageContext);
  const {
    postNewItem,
    changeItemContent
  } = entryPageContext as IEntryPageContext;
  function onSubmitHandler(values: any) {
    if (props.id) {
      changeItemContent({
        ...values,
        id: props.id
      });
    } else {
      postNewItem(values);
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
