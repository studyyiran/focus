import React, { useContext, useReducer, useState } from "react";
import MyModal from "../../../../components/modal";
import { locationHref } from "../../../../common/utils/routerHistory";
import { getLocationUrl } from "../../../../common/utils/util";
import { Input, Button, Select } from "antd";

import { Modal } from "antd";
import { func } from "prop-types";
import { IMyFocusContext, MyFocusContext } from "../../context";
import { FormWrapper } from "../formWrapper";
import { tagArr } from "../../config/tagArrConfig";

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

function reducer(state: INewTodoState, actions: any) {
  const { type, value } = actions;
  console.log(type);
  console.log(value);
  switch (type) {
    case "set":
      return { ...value };
    default:
      return { ...state };
  }
}

interface INewTodoState {
  tag: string;
  content: string;
}

export function useShowNewTodoModal(props: any) {
  const initState = {} as INewTodoState;
  // 保存用户缓存.
  const [state, dispatch] = useReducer(reducer, initState);
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
      // 清空本地的缓存
      dispatch({
        type: 'set',
        value: {}
      })
    }
  }

  const formConfig = [
    {
      id: "content",
      initialValue: props.content || state.content || "",
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
      initialValue: props.tag || state.tag || "study",
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
      maskClosable: false,
      title: null,
      footer: "single",
      cancelText: "Got it",
      children: (
        <div className="post-item-form">
          <FormWrapper
            formConfig={props.formConfig || formConfig}
            onSubmit={onSubmitHandler}
            onValuesChange={(value: any) => {
              dispatch({
                type: "set",
                value: value
              });
            }}
          />
        </div>
      )
    });
  };
}

/*
1)组件没有销毁.然而,一个modal,他必然被销毁.这个没办法
2)有单独的state保存了值,modal中的form只作为展示.

这次优化之后还是有空间 例如
1)目前只针对某一个弹框实例
2)当切换页面后,弹框实例一旦被销毁,就失去了这个缓存

 */
