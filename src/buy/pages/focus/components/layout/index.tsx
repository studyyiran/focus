import React, { useContext, useEffect } from "react";
import "./index.less";
import { routerConfig } from "../../routerConfig";
import RouterLink from "../../../../common-modules/components/routerLink";
import { useRouteMatch } from "react-router";
export function FocusLayout(props: any) {
  const { children, computedMatch, location } = props;
  const { path: fatherPath } = computedMatch;
  const { pathname } = location;

  // 进行匹配，同台渲染标题
  // 获取当前的url
  return (
    <div className="focus-layout focus-page-common">
      <header>
        <ul>
          {routerConfig.map(routerInfo => {
            const { path } = routerInfo;
            return (
              <div key={path}>
                <li
                  style={pathname === fatherPath + path ? { color: "red" } : {}}
                >
                  <RouterLink to={`${fatherPath}${path}`}>{path}</RouterLink>
                </li>
              </div>
            );
          })}
        </ul>
      </header>
      {routerConfig.map(routerInfo => {
        const { path } = routerInfo;
        return <RenderTitle key={path} {...routerInfo} fatherPath={fatherPath} />;
      })}
      <main>{children}</main>
    </div>
  );
}

function RenderTitle(props: any) {
  const { path, title, fatherPath } = props;
  const matched = !!useRouteMatch(`${fatherPath}${path}`);
  if (matched) {
    return <h1>{title}</h1>;
  } else {
    return null;
  }
}
