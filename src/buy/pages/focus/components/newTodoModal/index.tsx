import React, { useContext } from "react";
import MyModal from "../../../../components/modal";
import { locationHref } from "../../../../common/utils/routerHistory";
import { getLocationUrl } from "../../../../common/utils/util";
import { Input, Button, Select } from "antd";

import { Modal } from "antd";
import { func } from "prop-types";
import { IMyFocusContext, MyFocusContext } from "../../context";
import { FormWrapper } from "../formWrapper";
import {tagArr} from "../../config/tagArrConfig";

const { Option } = Select;
// export function NewTodoModal(props: any) {
//   const { show, ...others } = props;
//   // 一个不知道为什么会出现在这里的表单config
//   const formConfig = [
//     {
//       id: "content",
//       rules: [
//         {
//           required: true,
//           message: "not empty"
//         }
//       ],
//       renderFormEle: () => <Input />
//     },
//     {
//       id: "tag",
//       initialValue: "money",
//       rules: [
//         {
//           required: true,
//           message: "not empty"
//         }
//       ],
//       renderFormEle: () => (
//         <Select>
//           <Option value="review">复习</Option>
//           <Option value="study">学习</Option>
//           <Option value="money">金钱</Option>
//           <Option value="work">工作</Option>
//           <Option value="business">事业</Option>
//         </Select>
//       )
//     },
//     {
//       renderFormEle: () => <Button htmlType="submit">submit</Button>
//     }
//   ];
//
//   const modalProps = {
//     width: "70%",
//     closable: true,
//     title: null,
//     maskClosable: true,
//     cancelText: "Got it",
//     onCancel: () => {
//       props && props.onCancel && props.onCancel();
//     },
//     footer: null
//   };
//   return (
//     <Modal {...modalProps} visible={show}>
//       <PostItemForm formConfig={formConfig} {...others} />
//     </Modal>
//   );
//   // 日后制作修改弹框,需要传入id来实现
// }



export function useShowNewTodoModal(props: any) {
  const { onSubmit, _id, prevent = false, ...otherProps } = props;
  const myFocusContext = useContext(MyFocusContext);
  const { addTodayTodo, changeTodoItem } = myFocusContext as IMyFocusContext;
  function onSubmitHandler(values: any) {
    if (prevent && onSubmit) {
      // 执行自定义逻辑
      onSubmit(values);
    } else {
      // 这块是修改和新增两用
      if (props._id) {
        // 修改
        changeTodoItem({
          ...otherProps,
          ...values,
          id: _id
        });
      } else {
        // 新增
        addTodayTodo({ ...values, ...otherProps });
      }
      onSubmit && onSubmit(values);
    }
  }

  // 一个不知道为什么会出现在这里的表单config
  const formConfig = [
    {
      id: "content",
      initialValue: props.content || "",
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
      initialValue: props.tag || "study",
      rules: [
        {
          required: true,
          message: "not empty"
        }
      ],
      renderFormEle: () => (
        <Select>
          {tagArr.map(item => {
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
      renderFormEle: () => <Button htmlType="submit">submit</Button>
    }
  ];
  return () => {
    // 日后制作修改弹框,需要传入id来实现
    (MyModal as any).confirm({
      width: "70%",
      closable: true,
      maskClosable: true,
      title: null,
      footer: "single",
      cancelText: "Got it",
      children: (
        <div className="post-item-form">
          <FormWrapper formConfig={formConfig} onSubmit={onSubmitHandler} />
        </div>
      )
    });
  };
}
