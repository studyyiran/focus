import React from "react";
import Modal from "../../../../components/modal";
import PostItemForm from "../postItemForm";
import { locationHref } from "../../../../common/utils/routerHistory";
import { getLocationUrl } from "../../../../common/utils/util";
import { Input, Button, Select } from "antd";
const { Option } = Select;
export function NewTodoModal(props: any) {
  const { show } = props;
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

  const modalProps = {
    width: "70%",
    closable: true,
    title: null,
    maskClosable: true,
    cancelText: "Got it",
    footer: null
  };
  return (
    <Modal {...modalProps} visible={show}>
      <PostItemForm formConfig={formConfig} />
    </Modal>
  );
  // 日后制作修改弹框,需要传入id来实现
}
