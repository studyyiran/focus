// 这是公用代码
import React from "react";
import { MyFocusContextProvider } from "../pages/focus/context";
import { TargetInfoContextProvider } from "../pages/focus/pages/targetPage/context";
import { GodTreeContextProvider } from "../pages/focus/pages/tree/context";
import { SeasonContextProvider } from "../pages/focus/pages/season/context";
import { UserSunnyContextProvider } from "../pages/focus/context/sunny";
import { StoreChunksContextProvider } from "../pages/focus/pages/chunks/context";

export function RenderWithOriginData(props: any) {
  return (
    // ssr
    <UserSunnyContextProvider>
      <MyFocusContextProvider>
        <TargetInfoContextProvider>
          <StoreChunksContextProvider>
            <SeasonContextProvider>
              <GodTreeContextProvider>{props.children}</GodTreeContextProvider>
            </SeasonContextProvider>
          </StoreChunksContextProvider>
        </TargetInfoContextProvider>
      </MyFocusContextProvider>
    </UserSunnyContextProvider>
  );
}
