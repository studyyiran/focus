import React from "react";
import './index.less';
import { IChunks } from "../../context";
import { useModalForm } from "../../../../components/useModalForm";
import { Input, Select } from "antd";
const {Option} = Select

interface IChunk  {
  chunkInfo: IChunks,
  addLearnRecord: any
}

export const Chunk: React.FC<IChunk> = ({chunkInfo, addLearnRecord}) => {
  const {name, _id, learnLine} = chunkInfo
  function addHandler(info: any) {
    const a = {
      chunkId: _id,
      ...info
    }
    addLearnRecord({
      buffId: "buffId",
      ...a,
    });
  }
  return <div className="chunk-style">
    <h2>{name}</h2>
    {learnLine.map(({learnRecord}) => {
      return <ul>
        {learnRecord.map(({content}) => {
          return <li>{content}</li>
        })}
      </ul>
    })}
    <AddButton addHandler={addHandler} nextLine={learnLine.length}/>
  </div>
}


const LittleBlock: React.FC<IChunk> = ({chunkInfo}) => {
  return <div></div>
}

interface IAddButton {
  addHandler: any,
  nextLine: Number
}

const AddButton: React.FC<IAddButton> = (props) => {
  const {addHandler, nextLine} = props
  const blockTypeArr = [
    {
      value: 'PLAN',
      name: 'PLAN',
    },
    {
      value: 'TODO',
      name: 'TODO',
    },
    {
      value: 'DONE',
      name: 'DONE',
    },
  ]
  const addLittleBlockModal = useModalForm({
    formConfig:[
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
                <Option
                  value={item.value}
                  key={item.value}
                >
                  {item.name}
                </Option>
              );
            })}
          </Select>
        )
      },
    ],
    onSubmitHandler: (v: any) => {
      console.log(v)
      addHandler({...v, nextLine})
    }
  })
  return <div onClick={addLittleBlockModal}>add</div>
}