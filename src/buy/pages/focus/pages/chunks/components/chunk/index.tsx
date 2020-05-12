import React, { useEffect } from "react";
import "./index.less";
import { IChunks, ILearnRecord } from "../../context";
import { useModalForm } from "../../../../components/useModalForm";
import { Input, Select } from "antd";
import { MagicTimer2 } from "../../../season/components/magicTimer/index2";
import moment from "moment";
const { Option } = Select;

interface IChunk {
  chunkInfo: IChunks;
  addLearnRecord: any;
  changeOneRecord: any;
  serverCurrentTime: String;
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
  serverCurrentTime
}) => {
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

  return (
    <div className="chunk-style">
      <h2>chunkName: {name}</h2>
      <div className="record-container">
        {learnLine.map(({ learnRecord }, lineIndex) => {
          return (
            <ul className="learn-line">
              {learnRecord.map((learnRecord, index) => {
                return (
                  <li>
                    <LearnRecordBlock
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
                <AddButton addHandler={addHandler} lineIndex={lineIndex} />
              </li>
            </ul>
          );
        })}
      </div>
      <AddButton addHandler={addHandler} lineIndex={learnLine.length} />
    </div>
  );
};

interface ILittleBlock extends ILearnRecord {
  changeOneRecord: any;
  timePassValue: any;
}

const LearnRecordBlock: React.FC<ILittleBlock> = learnRecord => {
  let {
    content,
    status,
    startTime,
    changeOneRecord,
    _id,
    timePassValue
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

  function renderStartTimer() {
    return (
      <div
        onClick={() => {
          changeOneRecord({
            recordId: _id,
            type: "START"
          });
        }}
      >
        △
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
          return renderStartTimer();
          break;
        case "PLAN":
          return renderStartTimer();
          break;
        case "DONE":
          // 显示icon
          break;
        default:
          return renderStartTimer();
      }
    }
  }
  return <div className={"learn-record-block"}>{renderInner(content)}</div>;
};

interface IAddButton {
  addHandler: any;
  lineIndex: Number;
}

const AddButton: React.FC<IAddButton> = props => {
  const { addHandler, lineIndex } = props;

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
