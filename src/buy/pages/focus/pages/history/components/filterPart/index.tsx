import React, { useContext } from "react";
import { Select } from "antd";
import { tagArr } from "../../../../components/newTodoModal";
import { IMyFocusContext, MyFocusContext } from "../../../../context";
import "./index.less";

const { Option } = Select;
export function FilterPart() {
  const myFocusContext = useContext(MyFocusContext);
  const { changeHistoryFilter } = myFocusContext as IMyFocusContext;
  function onChangeSelectHandler(value: string) {
    console.log(value);
    changeHistoryFilter({
      tag: value
    });
  }
  return (
    <ul className="selector-list">
      <li>
        <section>
          <h3>Tag Part</h3>
          <Select
            defaultValue={tagArr[0].value}
            onChange={onChangeSelectHandler}
          >
            {tagArr.map(item => {
              return <Option value={item.value}>{item.name}</Option>;
            })}
          </Select>
        </section>
      </li>
      <li>
        <section>
          <h3>Time Part</h3>
          <Select
            defaultValue={tagArr[0].value}
            onChange={onChangeSelectHandler}
          >
            {tagArr.map(item => {
              return <Option value={item.value}>{item.name}</Option>;
            })}
          </Select>
          <Select
            defaultValue={tagArr[0].value}
            onChange={onChangeSelectHandler}
          >
            {tagArr.map(item => {
              return <Option value={item.value}>{item.name}</Option>;
            })}
          </Select>
        </section>
      </li>
    </ul>
  );
}
