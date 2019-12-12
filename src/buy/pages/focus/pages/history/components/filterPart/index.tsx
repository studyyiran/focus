import React from "react";
import { Select } from "antd";
import { tagArr } from "../../../../components/newTodoModal";

const { Option } = Select;
export function FilterPart() {
  function onChangeSelectHandler() {}
  return (
    <div>
      <section>
        <h3>Tag Part</h3>
        <Select defaultValue={tagArr[0].value} onChange={onChangeSelectHandler}>
          {tagArr.map(item => {
            return <Option value={item.value}>{item.name}</Option>;
          })}
        </Select>
      </section>
    </div>
  );
}
