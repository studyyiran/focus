import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreChunksContext, StoreChunksContext, IChunks } from "./context";
import { useModalForm } from "../../components/useModalForm";
import { Chunk } from "./components/chunk";

interface IChunksPage {}

export const ChunksPage: React.FC<IChunksPage> = props => {
  // 修改testValue
  // 修改StoreChunks
  // 引入context
  const storeChunksContext = useContext(StoreChunksContext);
  const {
    storeChunksContextValue,
    getAllChunks,
    startNewChunks
  } = storeChunksContext as IStoreChunksContext;
  // 从context中获取值
  const { chunksList } = storeChunksContextValue;
  // local发起请求
  useEffect(() => {
    getAllChunks();
  }, [getAllChunks]);

  const newChunkModal = useModalForm({
    onSubmitHandler: (value: any) => {
      startNewChunks({ name: value.defaultKey });
    }
  });

  // 渲染
  return (
    <div className="test-page">
      <RenderList chunksList={chunksList} />
      {chunksList.length}
      <button onClick={newChunkModal}>new</button>
    </div>
  );
};

interface IRenderList {
  chunksList: IChunks[];
}

const RenderList: React.FC<IRenderList> = props => {
  const storeChunksContext = useContext(StoreChunksContext);
  const {
    changeOneRecord,
    addLearnRecord,
    storeChunksContextValue
  } = storeChunksContext as IStoreChunksContext;
  const { serverCurrentTime, studyBuffList } = storeChunksContextValue;
  return (
    <ul>
      {props.chunksList.map((item, index) => {
        return (
          <li key={item._id}>
            <Chunk
              chunkInfo={item}
              addLearnRecord={addLearnRecord}
              changeOneRecord={changeOneRecord}
              serverCurrentTime={serverCurrentTime}
              studyBuffList={studyBuffList}
            />
          </li>
        );
      })}
    </ul>
  );
};
