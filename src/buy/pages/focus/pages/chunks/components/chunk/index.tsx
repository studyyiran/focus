import React from "react";
import "./index.less";
import { IChunks, ILearnRecord } from "../../context";
import { useModalForm } from "../../../../components/useModalForm";
import { Input, Select } from "antd";
const { Option } = Select;

interface IChunk {
  chunkInfo: IChunks;
  addLearnRecord: any;
}

export const Chunk: React.FC<IChunk> = ({ chunkInfo, addLearnRecord }) => {
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
                    <LearnRecordBlock {...learnRecord} />
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

interface ILittleBlock extends ILearnRecord{

}

const LearnRecordBlock: React.FC<ILittleBlock> = (learnRecord) => {
  const {content} = learnRecord
  return <div className={'learn-record-block'}>{content}</div>
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
        id: "tag",
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
