import React from "react";
import { Form } from "antd";

interface IFormConfig {
  id: string;
  label: string;
  rules: [];
  renderFormEle: any;
}

interface IFormWrapper {
  form: any,
  formConfig: any,
  onSubmit: any,
  setValueJson?: any,
}

class FormWrapperComponent extends React.Component<IFormWrapper, any> {
  render() {
    const {
      form,
      formConfig,
      onSubmit,
      setValueJson,
    } = this.props;
    const { getFieldDecorator, validateFields, setFields } = form;

    function onSubmitHandler(e: any) {
      e.preventDefault();
      validateFields((error: any, values: any) => {
        if (!error) {
          onSubmit && onSubmit(values);
        }
      });
    }
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
    return (
      <Form onSubmit={onSubmitHandler} layout={"vertical"} autoComplete={"off"}>
        {inner}
      </Form>
    );
  }
}

// 这个如何用ts定义
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
