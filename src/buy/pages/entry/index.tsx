import React, { useContext } from "react";
import "./index.less";
import { EntryPageContext, IEntryPageContext } from "./context";
import { FormWrapper } from "./components/formWrapper";
import { Input } from "antd";

export default function EntryPage() {
  const entryPageContext = useContext(EntryPageContext);
  const { entryPageContextValue } = entryPageContext as IEntryPageContext;
  const { list } = entryPageContextValue;
  console.log(list);
  const formConfig = [
    {
      id: "haha",
      rules: [
        {
          type: "email",
          error: "hehe"
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      renderFormEle: () => <button>submit</button>
    }
  ];

  function onSubmitHandler(values: any) {
    console.log(values);
  }

  return (
    <div className="test-page">
      // @ts-ignore
      <FormWrapper formConfig={formConfig} onSubmit={onSubmitHandler} />;
    </div>
  );
}
