import React, { useContext } from "react";
import "./index.less";
import { EntryPageContext, IEntryPageContext } from "./context";

export default function EntryPage() {
  const entryPageContext = useContext(EntryPageContext);
  const { entryPageContextValue } = entryPageContext as IEntryPageContext;
  const { list } = entryPageContextValue;
  console.log(list);
  return <div className="test-page">{123}</div>;
}
