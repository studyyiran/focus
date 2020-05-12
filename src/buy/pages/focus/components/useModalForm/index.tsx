import React, { useReducer, useRef } from "react";
import MyModal from "../../../../components/modal";
import { Input } from "antd";
import { FormWrapper } from "../formWrapper";

interface IUseModalForm {
  formConfig?: any;
  onSubmitHandler: any;
}

function reducer(state: any, actions: any) {
  const { type, value } = actions;
  switch (type) {
    case "set":
      return { ...value };
    default:
      return { ...state };
  }
}

const defaultFormConfig = [{
  id: 'defaultKey',
  initialValue: "",
  rules: [
    {
      message: "not empty"
    }
  ],
  renderFormEle: () => <Input />
}];

export const useModalForm = (props:IUseModalForm) : any => {
  const formRef = useRef({} as any);
  const { formConfig, onSubmitHandler } = props;
  const [state, dispatch] = useReducer(reducer, {});
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
            resolve();
          } else {
            reject();
          }
        });
      });

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
          formConfig={props.formConfig || defaultFormConfig}
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
  return () => (MyModal as any).confirm(modalObj);
};
