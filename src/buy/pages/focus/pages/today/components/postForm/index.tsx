import React, { useContext, useEffect } from "react";
import "./index.less";
import FormPartWrapper from "../../../../../../components/formPart/form";
import { Input } from "antd";
import { usePostNewItemHandler } from "../usePostNewItemHandler";

interface IPostForm {
  onPostHandler?: any;
  renderformConfig?: any;
}

export const PostForm: React.FC<IPostForm> = props => {
  const defaultFormConfig = () => [
    {
      id: "defaultKey",
      initialValue: "",
      rules: [
        {
          message: "not empty"
        }
      ],
      renderFormEle: () => <Input placeholder="hehehehe" />
    }
  ];

  const defaultPostHandler = usePostNewItemHandler();
  // 渲染
  const { onPostHandler, renderformConfig } = props;
  return (
    <div className="post-form">
      <FormPartWrapper
        onPostHandler={onPostHandler || defaultPostHandler}
        renderformConfig={renderformConfig || defaultFormConfig}
      />
    </div>
  );
};
