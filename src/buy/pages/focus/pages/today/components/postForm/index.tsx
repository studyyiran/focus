import React, { useContext, useEffect } from "react";
import "./index.less";
import {Button, Input, Select} from "antd";

import { usePostNewItemHandler } from "../usePostNewItemHandler";
import {sunnyType, tagArr} from "../../../../config/tagArrConfig";
import { FormWrapper } from "../../../../components/formWrapper";
import { TargetInfoContext } from "../../../targetPage/context";
const { Option } = Select;
interface IPostForm {
  onPostHandler?: any;
  formConfig?: any;
  defaultTargetId?: any;
}

export const PostForm: React.FC<IPostForm> = props => {
  const { onPostHandler, formConfig, defaultTargetId } = props;
  const targetInfoContext = useContext(TargetInfoContext);
  const { targetInfoContextValue, getTargetList } = targetInfoContext;
  const { targetList } = targetInfoContextValue;

  useEffect(() => {
    getTargetList();
  }, [getTargetList]);

  const defaultFormConfig = [
    {
      id: "content",
      initialValue: "",
      rules: [
        {
          required: true,
          message: "not empty"
        }
      ],
      renderFormEle: () => <Input placeholder="为今天添加一个TODO吧" />
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
          {tagArr.map(item => {
            console.log(item);
            return (
              <Option
                className={item.className}
                value={item.value}
                key={item.value}
              >
                {item.name}
              </Option>
            );
          })}
        </Select>
      )
    },
    {
      id: "targetId",
      initialValue: defaultTargetId || "",
      rules: [
        {
          required: true,
          message: "not empty"
        }
      ],
      renderFormEle: () => (
        <Select>
          {targetList.map(({ process, _id }) => {
            const { targetName } = process[0];
            return (
              <Option value={_id} key={_id}>
                {targetName}
              </Option>
            );
          })}
        </Select>
      ),
    },
    {
      renderFormEle: () => <Button htmlType="submit">Add Into Today Todo({sunnyType.todo})</Button>
    }
  ];

  const defaultPostHandler = usePostNewItemHandler();
  // 渲染

  return (
    <div className="post-form">
      <FormWrapper
        onSubmit={onPostHandler || defaultPostHandler}
        formConfig={formConfig || defaultFormConfig}
      />
    </div>
  );
};
