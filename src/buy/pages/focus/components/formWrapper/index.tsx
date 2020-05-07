import React from "react";
import { Form } from "antd";

interface IFormConfig {
  id: string;
  label: string;
  rules: [];
  renderFormEle: any;
}

/*
1）变为命令式
2）其实应该写一些最基本的测试。
3）去写接口的ts定义。
 */

interface IFormWrapperComponent {
  form: any,
  formConfig: any,
  onSubmit: any,
  setValueJson: any,
}

export const FormWrapperComponent: React.FC<IFormWrapperComponent> = props => {
  const {
    form,
    formConfig,
    onSubmit,
    setValueJson,
  } = props;
  const { getFieldDecorator, validateFields, setFields } = form;

  return (
    <Form onSubmit={onSubmitHandler} layout={"vertical"}>
      {getInner()}
    </Form>
  );

  function onSubmitHandler(e: any) {
    // 为什么要做这部？
    // e.preventDefault();
    validateFields((error: any, values: any) => {
      if (!error) {
        onSubmit && onSubmit(values);
      }
    });
  }

  function getInner() {
    const inner = formConfig.map((formConfig: IFormConfig, index: number) => {
      const { id, renderFormEle, label, ...otherConfig } = formConfig;
      if (id) {
        return (
          <Form.Item label={label} key={index}>
            {getFieldDecorator(id, otherConfig)(renderFormEle())}
          </Form.Item>
        );
      } else if (renderFormEle) {
        return (
          <Form.Item key={index} label={label}>
            {renderFormEle()}
          </Form.Item>
        );
      }
      return null;
    });
    return inner
  }
}


export const FormWrapper: any = Form.create({
  onFieldsChange: (...arg: any[]) => {
    // console.log('onFieldsChange')
    // console.log(arg[0]);
    // console.log(arg[1]);
    // console.log(arg[2]);
  },
  onValuesChange: (props, changedValues, allValues) => {
    // console.log('onValuesChange')
    // console.log(props);
    // console.log(changedValues);
    // console.log(allValues);
    if (props.onValuesChange) {
      props.onValuesChange(allValues)
    }
  }
})(FormWrapperComponent);
