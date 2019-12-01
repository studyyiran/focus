import React from "react";
import { Form } from "antd";

interface IFormConfig {
  id: string;
  label: string;
  rules: [];
  renderFormEle: any;
}

class FormWrapperComponent extends React.Component<any, any> {
  render() {
    const { form, formConfig, onSubmit, setValueJson } = this.props;
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
      <Form onSubmit={onSubmitHandler} layout={"vertical"}>
        {inner}
      </Form>
    );
  }
}

export const FormWrapper: any = Form.create()(FormWrapperComponent);
