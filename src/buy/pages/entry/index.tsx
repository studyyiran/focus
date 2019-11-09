import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { EntryPageContext, IEntryPageContext } from "./context";
import { FormWrapper } from "./components/formWrapper";
import { Input, Button } from "antd";
import { main } from "./eventLoop";
import PostItemForm from "./components/postItemForm";

export default function EntryPage() {
  const [showForm, setShowForm] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const entryPageContext = useContext(EntryPageContext);
  const {
    entryPageContextValue,
    deleteItem
  } = entryPageContext as IEntryPageContext;
  const { list } = entryPageContextValue;
  console.log(list);
  useEffect(() => {
    main();
  }, []);
  const formConfig = [
    {
      id: "content",
      rules: [
        {
          message: "not empty"
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      id: "tag",
      rules: [
        {
          message: "not empty"
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      renderFormEle: () => <Button htmlType="submit">submit</Button>
    }
  ];

  return (
    <div className="test-page">
      <h3>Doing</h3>
      <ul>
        {list.map(item => {
          const { content, _id } = item;
          return (
            <li key={_id}>
              <span>{content}</span>
              <Button
                onClick={() => {
                  setShowForm(true);
                  setCurrentId(_id);
                }}
              >
                delete
              </Button>
            </li>
          );
        })}
      </ul>
      <Button
        onClick={() => {
          setShowForm(true);
          setCurrentId("");
        }}
      >
        add new Todo
      </Button>
      <PostItemForm formConfig={formConfig} id={currentId} show={showForm} />
    </div>
  );
}
