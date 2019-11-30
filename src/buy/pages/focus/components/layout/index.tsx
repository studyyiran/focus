import React, { useContext, useEffect } from "react";
import "./index.less";
import { routerConfig } from "../../routerConfig";
import RouterLink from "../../../../common-modules/components/routerLink";
import { useRouteMatch } from "react-router";
export function FocusLayout(props: any) {
  const { children, computedMatch, location } = props;
  const { path: fatherPath } = computedMatch;
  const { pathname } = location;
  // 获取当前的url
  return (
    <div className="focus-layout">
      <div>
        <ul>
          {routerConfig.map(({ path }: any) => {
            return (
              <li
                style={pathname === fatherPath + path ? { color: "red" } : {}}
              >
                <RouterLink to={`${fatherPath}${path}`}>{path}</RouterLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
}
