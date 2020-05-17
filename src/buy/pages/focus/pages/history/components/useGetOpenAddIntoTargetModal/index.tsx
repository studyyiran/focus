import React, { useContext } from "react";
import { TargetInfoContext } from "../../../targetPage/context";
import { useModalForm } from "../../../../components/useModalForm";
import { Button, Select } from "antd";
const { Option } = Select;

export const useGetOpenAddIntoTargetModal = (todoId: string, onSubmitHandler?: any) => {
  const targetInfoContext = useContext(TargetInfoContext);
  const { targetInfoContextValue, addTargetRelate } = targetInfoContext;
  const { targetList } = targetInfoContextValue;

  const openAddIntoTargetModal = useModalForm({
    formConfig: [
      {
        id: "targetId",
        initialValue: "",
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
        )
      },
      {
        renderFormEle: () => <Button htmlType="submit">submit</Button>
      }
    ],
    onSubmitHandler: (values: any) => {
      const { targetId } = values;
      addTargetRelate({
        targetId,
        todoId
      });
      onSubmitHandler && onSubmitHandler()
    }
  });

  return openAddIntoTargetModal;
};
