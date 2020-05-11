import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreChunksContext, StoreChunksContext } from "./context";

interface IChunks {

}

export const ChunksPage: React.FC<IChunks> = props => {
  // 修改testValue
  // 修改StoreChunks
  // 引入context
  const storeChunksContext = useContext(StoreChunksContext);
  const {
    storeChunksContextValue,
    getTestAjaxValue
  } = storeChunksContext as IStoreChunksContext;
  // 从context中获取值
  const { testValue } = storeChunksContextValue;
  // local发起请求
  useEffect(() => {
    getTestAjaxValue();
  }, [getTestAjaxValue]);
  // 渲染
  return <div className="test-page">{testValue}</div>;
}
