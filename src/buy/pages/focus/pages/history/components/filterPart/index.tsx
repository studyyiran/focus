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
  const timeTarget = [
    {
      value: "createTime",
      name: "创建时间"
    },
    {
      value: "finishDate",
      name: "完成时间"
    },
    {
      value: "planStartTime",
      name: "开始时间"
    }
  ];
  const configArr = [
    {
      title: "Tag Part",
      children: [
        { key: "tag", arrSource: tagArr, handler: onChangeSelectHandler }
      ]
    },
    {
      title: " Time Part",
      children: [
        {
          key: "timeTarget",
          arrSource: timeTarget,
          handler: onChangeSelectHandler
        },
        {
          key: "timeRange",
          arrSource: timeTarget,
          handler: onChangeSelectHandler
        }
      ]
    }
  ];

  return (
    <ul className="selector-list">
      {configArr.map(({ title, children }) => {
        console.log(children);

        return (
          <li>
            <section>
              <h3>{title}</h3>
              {children.map(({ key, arrSource, handler }) => {
                return (
                  <Select
                    defaultValue={arrSource[0].value}
                    onChange={handler.bind({}, key)}
                  >
                    {arrSource.map((item: any) => {
                      return <Option value={item.value}>{item.name}</Option>;
                    })}
                  </Select>
                );
              })}
            </section>
          </li>
        );
      })}
    </ul>
  );
}
