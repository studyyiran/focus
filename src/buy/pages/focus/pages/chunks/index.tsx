import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreChunksContext, StoreChunksContext, IChunks } from "./context";

interface IChunksPage {}

export const ChunksPage: React.FC<IChunksPage> = props => {
  // 修改testValue
  // 修改StoreChunks
  // 引入context
  const storeChunksContext = useContext(StoreChunksContext);
  const {
    storeChunksContextValue,
    getAllChunks,
    startNewChunks,
addLearnRecord
  } = storeChunksContext as IStoreChunksContext;
  // 从context中获取值
  const { chunksList } = storeChunksContextValue;
  // local发起请求
  useEffect(() => {
    getAllChunks();
  }, [getAllChunks]);
  // 渲染
  return (
    <div className="test-page">
      <RenderList chunksList={chunksList} />
      {chunksList.length}
      <button
        onClick={() => {
          startNewChunks({ name: "hehehe" });
        }}
      >123</button>
    </div>
  );
};

interface IRenderList {
  chunksList: IChunks[]
}

const RenderList: React.FC<IRenderList>= (props)=> {
  const storeChunksContext = useContext(StoreChunksContext);
  const {
    storeChunksContextValue,
    getAllChunks,
    startNewChunks,
    addLearnRecord
  } = storeChunksContext as IStoreChunksContext;
  return <ul>
    {props.chunksList.map((item, index) => {
      return <li key={item._id} onClick={() => {
        addLearnRecord({
          chunkId: item._id,
          nextLine: item.learnLine.length,
          tag: '123',
          content: 'content',
          buffId: 'buffId',
        })
      }}>{item._id}</li>
    })}
  </ul>
}
