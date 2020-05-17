import React, { useEffect, useState } from "react";
import "./index.less";
import { IChunks, ILearnRecord, IStoreChunksState } from "../../context";
import { useModalForm } from "../../../../components/useModalForm";
import { Input, Select } from "antd";
import { MagicTimer2 } from "../../../season/components/magicTimer/index2";
import moment from "moment";
const { Option } = Select;

interface IChunk {
  chunkInfo: IChunks;
  addLearnRecord: any;
  changeOneRecord: any;
  serverCurrentTime: string;
  studyBuffList: IStoreChunksState["studyBuffList"];
}

const blockTypeArr = [
  {
    value: "PLAN",
    name: "PLAN"
  },
  {
    value: "TODO",
    name: "TODO"
  },
  {
    value: "DONE",
    name: "DONE"
  }
];

export const Chunk: React.FC<IChunk> = ({
  chunkInfo,
  addLearnRecord,
  changeOneRecord,
  serverCurrentTime,
  studyBuffList
}) => {
  const [currentRecordId, setCurrentRecordId] = useState("");
  const { name, _id, learnLine } = chunkInfo;
  function addHandler(info: any) {
    const a = {
      chunkId: _id,
      ...info
    };
    addLearnRecord({
      buffId: "buffId",
      ...a
    });
  }

  function renderCurrent() {
    let target;
    learnLine.find(({ learnRecord }) => {
      return learnRecord.find(item => {
        if (item._id === currentRecordId) {
          target = item;
          return true;
        } else {
          return false;
        }
      });
    });
    if (target) {
      const { createTime, startTime, lastingTime, content, buffId } = target;
      return (
        <table>
          <thead>
            <tr>
              <th>startTime</th>
              <th>lastingTime</th>
              <th>content</th>
              <th>buffId</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{startTime}</td>
              <td>{lastingTime}</td>
              <td>{content}</td>
              <td>{buffId && (buffId as any).buffName}</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="chunk-style">
      <h2>chunkName: {name}</h2>
      <div className="info-container">{renderCurrent()}</div>
      <div className="record-container">
        {learnLine.map(({ learnRecord }, lineIndex) => {
          return (
            <ul className="learn-line">
              {learnRecord.map((learnRecord, index) => {
                return (
                  <li>
                    <LearnRecordBlock
                      setCurrentRecordId={setCurrentRecordId}
                      studyBuffList={studyBuffList}
                      timePassValue={
                        25 * 60 * 1000 -
                        moment(serverCurrentTime as any).diff(
                          moment(learnRecord.startTime)
                        )
                      }
                      {...learnRecord}
                      changeOneRecord={changeOneRecord}
                    />
                  </li>
                );
              })}
              <li>
                <AddButton
                  addHandler={addHandler}
                  lineIndex={lineIndex}
                  studyBuffList={studyBuffList}
                />
              </li>
            </ul>
          );
        })}
      </div>
      <AddButton
        addHandler={addHandler}
        lineIndex={learnLine.length}
        studyBuffList={studyBuffList}
      />
    </div>
  );
};

interface ILittleBlock extends ILearnRecord {
  changeOneRecord: any;
  timePassValue: any;
  setCurrentRecordId: any;
  studyBuffList: IStoreChunksState["studyBuffList"];
}

const LearnRecordBlock: React.FC<ILittleBlock> = learnRecord => {
  let {
    content,
    tag,
    status,
    startTime,
    changeOneRecord,
    _id,
    timePassValue,
    buffId,
    studyBuffList,
    setCurrentRecordId,
    planDeadLineTime
  } = learnRecord;
  console.log(timePassValue);
  useEffect(() => {}, []);

  const finishRecordModal = useModalForm({
    formConfig: [
      {
        id: "content",
        initialValue: content,
        rules: [
          {
            required: true,
            message: "not empty"
          }
        ],
        renderFormEle: () => <Input />
      },
      {
        id: "tag",
        initialValue: tag,
        rules: [
          {
            required: true,
            message: "not empty"
          }
        ],
        renderFormEle: () => (
          <Select>
            <Option value={"study"} key={"study"}>
              study
            </Option>
            <Option value={"review"} key={"review"}>
              review
            </Option>
          </Select>
        )
      },
      {
        id: "lastingTime",
        initialValue: Math.floor(moment().diff(moment(startTime)) / 1000 / 60),
        rules: [
          {
            required: true,
            message: "not empty"
          }
        ],
        renderFormEle: () => <Input />
      },
      {
        id: "status",
        initialValue: status,
        rules: [
          {
            required: true,
            message: "not empty"
          }
        ],
        renderFormEle: () => (
          <Select>
            {blockTypeArr.map(item => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        )
      },
      {
        id: "buffId",
        initialValue:
          (buffId && buffId._id) ||
          (studyBuffList && studyBuffList[0] && studyBuffList[0]._id),
        rules: [
          {
            required: true,
            message: "not empty"
          }
        ],
        renderFormEle: () => (
          <Select>
            {studyBuffList.map(item => {
              return (
                <Option value={item._id as any} key={item._id as any}>
                  {item.buffName}:{item.content}
                </Option>
              );
            })}
          </Select>
        )
      }
    ],
    onSubmitHandler: (v: any) => {
      console.log(v);
      changeOneRecord({
        ...v,
        lastingTime: v.lastingTime * 60 * 1000,
        status: "DONE",
        recordId: _id
      });
    }
  });

  function renderTodo() {
    const oneDay = Number(moment.duration(1, "days"));
    const diff = Number(moment(planDeadLineTime).diff(moment()));
    let color;
    if (diff >= oneDay) {
      color = `rgba(0, 188, 37, 1)`;
    } else if (diff >= 0 && diff < oneDay) {
      let percent = diff / oneDay;
      color = `rgba(0, 188, 37, ${percent})`;
    } else if (diff >= -1 * oneDay && diff < 0) {
      let percent = Math.abs(diff / oneDay);
      color = `rgba(0, 0, 0, ${percent})`;
    } else if (diff < -1 * oneDay) {
      color = `rgba(0, 0, 0, 1)`;
    }
    return <div style={{ backgroundColor: `${color}` }}>{moment.duration(diff).hours()}</div>;
  }

  function renderStartTimer(children?: any) {
    return (
      <div
        onClick={() => {
          changeOneRecord({
            recordId: _id,
            type: "START"
          });
        }}
      >
        {children ? children : `△`}
      </div>
    );
  }
  function renderInner(content: string) {
    // 如果已经开始，并且
    // 显示计时器
    if (startTime && status !== "DONE" && status !== "DELAY") {
      return (
        <>
          <MagicTimer2 currentTime={timePassValue} />
          <div
            onClick={() => {
              changeOneRecord({
                recordId: _id,
                type: "STOP"
              });
            }}
          >
            停止
          </div>
          <div onClick={finishRecordModal}>完成</div>
        </>
      );
    } else {
      switch (status) {
        case "TODO":
          return renderStartTimer(renderTodo());
          break;
        case "PLAN":
          return renderStartTimer();
          break;
        case "DONE":
          // 显示icon
          //   return <img src="https://bkimg.cdn.bcebos.com/pic/b17eca8065380cd78942d910a244ad34588281ea?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1" />
          return <img src={require("./res/icon1.png")} />;
          break;
        default:
          return renderStartTimer();
      }
    }
  }
  return (
    <div
      className={"learn-record-block"}
      onClick={() => {
        setCurrentRecordId(_id);
      }}
      onMouseEnter={() => {
        setCurrentRecordId(_id);
      }}
    >
      {renderInner(content)}
    </div>
  );
};

interface IAddButton {
  addHandler: any;
  lineIndex: number;
  studyBuffList: IStoreChunksState["studyBuffList"];
}

const AddButton: React.FC<IAddButton> = props => {
  const { addHandler, lineIndex, studyBuffList } = props;

  const addLittleBlockModal = useModalForm({
    formConfig: [
      {
        id: "content",
        initialValue: "",
        rules: [
          {
            required: true,
            message: "not empty"
          }
        ],
        renderFormEle: () => <Input />
      },
      {
        id: "tag",
        initialValue: "study",
        rules: [
          {
            required: true,
            message: "not empty"
          }
        ],
        renderFormEle: () => (
          <Select>
            <Option value={"study"} key={"study"}>
              study
            </Option>
            <Option value={"review"} key={"review"}>
              review
            </Option>
          </Select>
        )
      },
      {
        id: "status",
        initialValue: "PLAN",
        rules: [
          {
            required: true,
            message: "not empty"
          }
        ],
        renderFormEle: () => (
          <Select>
            {blockTypeArr.map(item => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        )
      },
      {
        id: "buffId",
        initialValue: studyBuffList && studyBuffList[0] && studyBuffList[0]._id,
        rules: [
          {
            required: true,
            message: "not empty"
          }
        ],
        renderFormEle: () => (
          <Select>
            {studyBuffList.map(item => {
              return (
                <Option value={item._id as any} key={item._id as any}>
                  {item.buffName}:{item.content}
                </Option>
              );
            })}
          </Select>
        )
      }
    ],
    onSubmitHandler: (v: any) => {
      console.log(v);
      addHandler({ ...v, lineIndex });
    }
  });
  return (
    <div className="add-button" onClick={addLittleBlockModal}>
      add+
    </div>
  );
};
