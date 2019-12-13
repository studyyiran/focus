import React, { useContext } from "react";
import { Select } from "antd";
import { IMyFocusContext, MyFocusContext } from "../../../../context";
import "./index.less";
import {
  tagArr,
  timeRangeArr,
  timeTargetArr
} from "../../../../config/tagArrConfig";

const { Option } = Select;
export function FilterPart() {
  const myFocusContext = useContext(MyFocusContext);
  const {
    changeHistoryFilter,
    myFocusContextValue
  } = myFocusContext as IMyFocusContext;
  const { historyFilter } = myFocusContextValue;
  // 这是一个通用的回调
  function onChangeSelectHandler(type: string, value: string) {
    const changeResult = {} as any;
    changeResult[type] = value;
    changeHistoryFilter(changeResult);
  }

  const configArr = [
    {
      title: "Time Part",
      children: [
        {
          key: "timeTarget",
          arrSource: timeTargetArr,
          handler: onChangeSelectHandler
        },
        {
          key: "timeRange",
          arrSource: timeRangeArr,
          handler: onChangeSelectHandler
        }
      ]
    },
    {
      title: "Tag Part",
      children: [
        { key: "tag", arrSource: tagArr, handler: onChangeSelectHandler }
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
                // @ts-ignore
                return (
                  <Select
                    defaultValue={(historyFilter as any)[key]}
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
