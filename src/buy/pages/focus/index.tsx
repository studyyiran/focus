import React from "react";
import { routerConfig } from "./routerConfig/index";
import { Switch, Route } from "react-router-dom";

export function FocusRouter(props: any) {
  const { path } = props.match;
  const dom = routerConfig.map(({ path: relativePath, ...others }) => {
    return <Route path={path + relativePath} {...others} />;
  });
  return <Switch>{dom}</Switch>;
}
