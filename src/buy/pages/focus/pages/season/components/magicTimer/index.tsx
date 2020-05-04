import React, { useReducer, useRef, useState } from "react";
import "./index.less";
import { MyTimer } from "../../../../../../common/utils/timer";
import { seasonServer } from "../../server";
import { levelupModal } from "../../../targetPage/components/renderLevelUpButtons";
import { Button, Select } from "antd";
const { Option } = Select;

interface IMagicTimer {}

const TIMERSTATUS = {
  STOP: "stop",
  DOING: "doing",
  FINISH: "finish"
};

const reducer = (state: any, action: any) => {
  const { type, value } = action;
  switch (type) {
    case "setStatus":
      state.status = value;
      break;
    case "setCurrentTime":
      state.currentTime = value;
      break;
  }
  return { ...state };
};

export const MagicTimer: React.FC<IMagicTimer> = props => {
  const initState = {
    status: TIMERSTATUS.STOP,
    currentTime: 25 * 1000 * 60
  };
  const [state, dispatch] = useReducer(reducer, initState);
  let timerRef = useRef({} as any);
  const renderByStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case TIMERSTATUS.STOP:
        return (
          <button
            onClick={() => {
              newTimer(state.currentTime);
              dispatch({
                type: "setStatus",
                value: TIMERSTATUS.DOING
              });
            }}
          >
            start!
          </button>
        );
      case TIMERSTATUS.DOING:
        return (
          <button
            onClick={() => {
              if (timerRef && timerRef.current && timerRef.current.stop) {
                timerRef.current.stop();
                dispatch({
                  type: "status",
                  value: TIMERSTATUS.STOP
                });
              }
            }}
          >
            stop!
          </button>
        );
      case TIMERSTATUS.FINISH:
        const buffConfigArr = [
          {
            buffName: "时光神碑雕刻术",
            content: "你正在通过复习过去一周大量的知识，来进行输出。"
          },
          {
            buffName: "晨曦智慧",
            content: "早上学习的效率，尤其是复习昨晚知识的效率，是非常高的。"
          },
          {
            buffName: "晨曦幻梦",
            content: "通过记录伊瑟拉的幻境游记，获得来自潜意识王国的启事。"
          },
          {
            buffName: "食人魔",
            content: "在吃饭的时候，去学习中文mooc"
          },
          {
            buffName: "聚沙成塔",
            content: "通过将零散的内容进行整理，来在转录笔记。笔记是复习的基础"
          },
          {
            buffName: "大师级死灵书",
            content: "通过阅读主书籍，来强化理解。扩宽理解。"
          },
          {
            buffName: "朝花夕拾",
            content:
              "项目里面遇到的问题，全部都是你提升的根本，钻石的前身，不掌握他们，你无法有任何的技术提升"
          },
          {
            buffName: "课后习题",
            content: "课后习题"
          },
          {
            buffName: "章节测试",
            content: "秋"
          },
          {
            buffName: "回想",
            content: "通过提取训练，让组块深化"
          },
          {
            buffName: "骑行大法",
            content: "在路上，收听得到课程"
          },
          {
            buffName: "暗度陈仓",
            content: "同时做两件事，穿插，刺激。"
          }
        ];
        return (
          <button
            onClick={() => {
              // 填入时间。
              // 填入buff类型。
              // 进行记录。
              levelupModal(
                "buffName",
                (info: any) => {
                  seasonServer.addStudyBuffRecord({
                    type: info.buffName,
                    continueTime: 25 * 1000 * 60
                  });
                },
                [
                  {
                    id: "buffName",
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "not empty"
                      }
                    ],
                    renderFormEle: () => (
                      <Select>
                        {buffConfigArr.map(({ buffName, content }) => {
                          return (
                            <Option value={buffName} key={buffName}>
                              {buffName}:{content}
                            </Option>
                          );
                        })}
                      </Select>
                    )
                  },
                  {
                    renderFormEle: () => (
                      <Button htmlType="submit">submit</Button>
                    )
                  }
                ]
              );
            }}
          >
            stop!
          </button>
        );
      default:
        return null;
    }
  };

  const newTimer = (time: Number, finishCallBack?: any) => {
    const info = {
      time: time,
      onlyStartTime: time,
      minInterval: -1000,
      runCallBack: (times: any, timeSecond: any) => {
        dispatch({
          type: "setCurrentTime",
          value: timeSecond
        });
      },
      finishCallBack: () => {
        // that.setState({
        //   times: []
        // });
      }
    };
    // @ts-ignore
    timerRef.current = new MyTimer(info);
    timerRef.current.start();
  };
  return (
    <div className="magic-timer">
      {timerRef &&
        timerRef.current &&
        timerRef.current.format &&
        timerRef.current.format(state.currentTime).join(":")}
      {renderByStatus(state.status)}
      {renderByStatus(TIMERSTATUS.FINISH)}
    </div>
  );
};
