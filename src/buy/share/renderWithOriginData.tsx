// 这是公用代码
import React from "react";
import { MyFocusContextProvider } from "../pages/focus/context";

export function RenderWithOriginData(props: any) {
  return (
    // ssr
    <MyFocusContextProvider>{props.children}</MyFocusContextProvider>
  );
}
