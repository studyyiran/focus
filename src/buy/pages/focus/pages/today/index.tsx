import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { FormWrapper } from "../../components/formWrapper";
import { Input, Button, Select } from "antd";
import { main } from "./eventLoop";
import PostItemForm from "../../components/postItemForm";
import { TodayPageSection } from "../../components/todayPageSection";
import { IMyFocusContext, MyFocusContext } from "../../context";
import Svg from "../../../../components/svg";
const { Option } = Select;

export function FocusToday() {
  const [showForm, setShowForm] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const myFocusContext = useContext(MyFocusContext);
  const {
    myFocusContextValue,
    deleteItem,
    changeStudyItemStatus
  } = myFocusContext as IMyFocusContext;
  const { list } = myFocusContextValue;
  console.log(list);

  // ?
  useEffect(() => {
    main();
  }, []);

  // 一个不知道为什么会出现在这里的表单config
  const formConfig = [
    {
      id: "content",
      rules: [
        {
          required: true,
          message: "not empty"
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      id: "tag",
      initialValue: "study",
      rules: [
        {
          required: true,
          message: "not empty"
        }
      ],
      renderFormEle: () => (
        <Select>
          <Option value="review">review</Option>
          <Option value="study">study</Option>
        </Select>
      )
    },
    {
      renderFormEle: () => <Button htmlType="submit">submit</Button>
    }
  ];

  return (
    <div className="test-page">
      <TodayPageSection title="Plane">
        {list.map(item => {
          const { content, _id } = item;
          return (
            <li key={_id}>
              <span>{content}</span>
              <Button
                onClick={() => {
                  deleteItem(_id);
                }}
              >
                delete
              </Button>
              <Button
                onClick={() => {
                  setShowForm(true);
                  setCurrentId(_id);
                }}
              >
                change
              </Button>
              <Button onClick={changeStudyItemStatus.bind({}, _id)}>
                finish
              </Button>
            </li>
          );
        })}
        <div>
          <Button
            onClick={() => {
              setShowForm(true);
              setCurrentId("");
            }}
          >
            <Svg icon="jia" />Add Into Today Todo
          </Button>
        </div>
        <PostItemForm formConfig={formConfig} id={currentId} show={showForm} />
      </TodayPageSection>
    </div>
  );
}
