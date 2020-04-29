import React from "react";
import { ISeason, ISeasonState } from "../../context";
import "./index.less";
import { levelupModal } from "../../../targetPage/components/renderLevelUpButtons";
import { Button, Select } from "antd";
import { ISeasonActions } from "../../context/useGetActions";
const { Option } = Select;

interface ISeasonLine extends ISeason {
  todayLearnThingList: ISeasonState["todayLearnThingList"];
  addTodoIntoSeason: ISeasonActions["addTodoIntoSeason"];
}
// addTodoIntoSeason={addTodoIntoSeason} todayLearnThingList={todayLearnThingList}
export const SeasonLine: React.FC<ISeasonLine> = props => {
  const {
    _id,
    slots,
    todayLearnThingList,
    addTodoIntoSeason,
    name,
    createTime
  } = props;
  // const fillSlots : any[] = new Array(4).fill({})

  const fillSlotsFunc = () => {
    const maxEmptyCount = 8;
    const fillSlots = [] as any[];
    new Array(slots.length > maxEmptyCount ? slots.length : maxEmptyCount)
      .fill({})
      .map((item, index) => {
        const slotInfo = slots[index];
        if (slotInfo) {
          const { isLock } = slotInfo;
          if (isLock) {
            return {
              type: "lock"
            };
          } else {
            if (index % 2 === 0) {
              return {
                type: "study"
              };
            } else {
              return {
                type: "review"
              };
            }
          }
        } else {
          return { type: "none" };
        }
      })
      .forEach((item, index) => {
        if (index % 2 === 0) {
          fillSlots.push([item.type]);
        } else {
          fillSlots[fillSlots.length - 1].push(item.type);
        }
      });
    return fillSlots;
  };
  const fillSlots = fillSlotsFunc();
  console.log(slots);
  return (
    <tbody className="season-line-container">
      <tr>
        <td>{name}</td>
        <td>{createTime}</td>
        <td>
          <div className="season-line">
            {fillSlots.map((config: any) => {
              return <Slot configArr={config} />;
            })}
          </div>
        </td>
        <td>
          <button
            onClick={() => {
              // 1 进入这个页面会拉waitList
              // 2 根据最后一个的类别，筛选出来用户可以选择的范围。
              // 3 用户选定后，将两个id扔上去。
              addTodoIntoSeasonHandler(
                _id,
                (() => {
                  const targetIndex = slots.findIndex(item => item.isLock);
                  if (slots && slots.length) {
                    let current = targetIndex === -1 ? slots.length : targetIndex
                    return current % 2 === 0;
                  } else {
                    return false;
                  }
                })()
              );
            }}
          >
            add into
          </button>
        </td>
      </tr>
    </tbody>
  );

  function addTodoIntoSeasonHandler(seasonId: any, isStudy: boolean) {
    levelupModal(
      "useless",
      (info: any) => {
        addTodoIntoSeason({ todoId: info.todoId, seasonId });
      },
      [
        {
          id: "todoId",
          initialValue: "",
          rules: [
            {
              required: true,
              message: "not empty"
            }
          ],
          renderFormEle: () => (
            <Select>
              {todayLearnThingList
                .filter(todoInfo =>
                  isStudy ? todoInfo.tag === "study" : todoInfo.tag === "review"
                )
                .map(({ content, _id }) => {
                  return (
                    <Option value={_id} key={_id}>
                      {content}
                    </Option>
                  );
                })}
            </Select>
          )
        },
        {
          renderFormEle: () => <Button htmlType="submit">submit</Button>
        }
      ]
    );
  }
};

interface ISlot {
  configArr: String[];
}

const Slot: React.FC<ISlot> = props => {
  const { configArr } = props;
  const config: any = {
    none: {
      src: require("./res/off.jpg")
    },
    study: {
      src: require("./res/study.jpg")
    },
    review: {
      src: require("./res/review.jpg")
    },
    lock: {
      src: require("./res/lock.jpg")
    }
  };
  return (
    <div className="season-slot">
      {configArr.map((key, index) => {
        return <img key={index} src={config[key as any].src} />;
      })}
    </div>
  );
};
