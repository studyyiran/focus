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
  console.log(timePassValue)
  useEffect(() => {}, []);
  if (startTime) {
    status = "DOING";
  }
  function renderStartTimer() {
    return (
      <div
        onClick={() => {
          changeOneRecord({
            recordId: _id,
            status: "START"
          });
        }}
      >
        △
      </div>
    );
  }
  function renderInner() {
    switch (status) {
      case "TODO":
        return renderStartTimer();
        break;
      case "PLAN":
        return renderStartTimer();
        break;
      case "DOING":
        // 显示计时器
        return <MagicTimer2 currentTime={timePassValue} />;
        break;
      case "DONE":
        // 显示icon
        break;
      default:
        return renderStartTimer();
    }
  }
  return (
    <div className={"learn-record-block"}>
      {renderInner()}
      <div>{content}</div>
    </div>
  );
};

interface IAddButton {
  addHandler: any;
  lineIndex: Number;
}

const AddButton: React.FC<IAddButton> = props => {
  const { addHandler, lineIndex } = props;
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
