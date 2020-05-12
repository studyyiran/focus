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
  serverCurrentTime: String;
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
    status,
    startTime,
    changeOneRecord,
    _id,
    timePassValue,
    buffId,
    studyBuffList,
    setCurrentRecordId
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
      },
      {
        id: "buffId",
        initialValue:
          buffId._id ||
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
  lineIndex: Number;
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
