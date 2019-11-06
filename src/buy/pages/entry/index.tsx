import React, { useContext } from "react";
import "./index.less";
import { EntryPageContext, IEntryPageContext } from "./context";

export default function EntryPage() {
  const sntryPageContext = useContext(EntryPageContext);
  const { entryPageContextValue } = sntryPageContext as IEntryPageContext;
  const { testValue } = entryPageContextValue;
  return <div className="test-page">{testValue}</div>;
}
