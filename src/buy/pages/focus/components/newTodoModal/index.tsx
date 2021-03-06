import React, { useContext, useReducer, useRef, useState } from "react";
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
  const formRef: any = useRef();

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
        type: "set",
        value: {}
      });
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
  ];
  return () => {
    const modalObj = {
      width: "70%",
      closable: false,
      maskClosable: false,
      title: null,
      onOk: () => {
        // 这是modal按钮hack form的正确打开方式。他并没有提供submit方法。而是通过获取值，然后自己调用回调这种奇怪的方式实现的。
        // 而使用form自带的，无非就是，默认帮助我们提交而已。
        return new Promise((resolve, reject) => {
          formRef.current.props.form.validateFields((error: any, values: any) => {
            if (!error) {
              onSubmitHandler(values);
              resolve()
            } else {
              reject()
            }
          });
        })

        // formRef.current.props.form.submit(());
      },
      cancelText: "Cancel",
      okText: "submit",
      children: (
        <div className="post-item-form">
          <FormWrapper
            wrappedComponentRef={(inst: any) => {
              console.log("get it");
              formRef.current = inst;
            }}
            formConfig={props.formConfig || formConfig}
            onSubmit={onSubmitHandler}
            onValuesChange={(value: any) => {
              console.log("get onValuesChange");
              console.log(value);
              dispatch({
                type: "set",
                value: value
              });
            }}
          />
        </div>
      )
    };
    // 日后制作修改弹框,需要传入id来实现
    return (MyModal as any).confirm(modalObj);
  };
}

/*
1)组件没有销毁.然而,一个modal,他必然被销毁.这个没办法
2)有单独的state保存了值,modal中的form只作为展示.

这次优化之后还是有空间 例如
1)目前只针对某一个弹框实例
2)当切换页面后,弹框实例一旦被销毁,就失去了这个缓存

 */
