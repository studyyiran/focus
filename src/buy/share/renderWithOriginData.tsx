// 这是公用代码
import React from "react";
import { MyFocusContextProvider } from "../pages/focus/context";
import { TargetInfoContextProvider } from "../pages/focus/pages/targetPage/context";
import { GodTreeContextProvider } from "../pages/focus/pages/tree/context";

export function RenderWithOriginData(props: any) {
  return (
    // ssr
    <MyFocusContextProvider>
      <TargetInfoContextProvider>
        <GodTreeContextProvider>{props.children}</GodTreeContextProvider>
      </TargetInfoContextProvider>
    </MyFocusContextProvider>
  );
}
