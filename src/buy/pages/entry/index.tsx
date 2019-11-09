import React, { useContext, useEffect } from "react";
import "./index.less";
import { EntryPageContext, IEntryPageContext } from "./context";
import { FormWrapper } from "./components/formWrapper";
import { Input, Button } from "antd";
import { main } from "./eventLoop";

export default function EntryPage() {
  const entryPageContext = useContext(EntryPageContext);
  const { entryPageContextValue } = entryPageContext as IEntryPageContext;
  const { list } = entryPageContextValue;
  console.log(list);
  useEffect(() => {
    main();
  }, []);
  const formConfig = [
    {
      id: "haha",
      rules: [
        {
          type: "email",
          message: "no you cant"
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      renderFormEle: () => <Button htmlType="submit">submit</Button>
    }
  ];

  function onSubmitHandler(values: any) {
    console.log(values);
  }

  return (
    <div className="test-page">
      <h3>Doing</h3>
      <ul>
        {list.map((item) => {
          const {content} = item
          return <li>{content}</li>
        })}
      </ul>
      <FormWrapper formConfig={formConfig} onSubmit={onSubmitHandler} />
    </div>
  );
}
