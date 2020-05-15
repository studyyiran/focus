import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { routerConfig } from "../../routerConfig";
import RouterLink from "../../../../common-modules/components/routerLink";
import { useRouteMatch } from "react-router";
import "../../common.less";
import { SliderPart } from "../sliderPart";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import MyModal from "../../../../components/modal";
import {SliderLayoutPart} from "../sliderLayoutPart";


export function FocusLayout(props: any) {
  const { children, computedMatch, location } = props;
  const { path: fatherPath } = computedMatch;
  const { pathname } = location;
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  function onCancelHandler() {
    setShowModal2(false);
    setTimeout(() => {
      setShowModal(false);
    }, 250);
  }

  // 进行匹配，同台渲染标题
  // 获取当前的url
  return (
    <div className="focus-layout focus-page-common">
      {/*<header>*/}
      {/*  <ul>*/}
      {/*    {routerConfig.map(routerInfo => {*/}
      {/*      const { path } = routerInfo;*/}
      {/*      return (*/}
      {/*        <div key={path}>*/}
      {/*          <li*/}
      {/*            style={pathname === fatherPath + path ? { color: "red" } : {}}*/}
      {/*          >*/}
      {/*            <RouterLink to={`${fatherPath}${path}`}>{path}</RouterLink>*/}
      {/*          </li>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </ul>*/}
      {/*</header>*/}

      <RenderByCondition
        ComponentMb={
          <MyModal
            width={"6rem"}
            style={showModal2 ? { left: "0" } : {}}
            visible={showModal}
            title={""}
            className="product-list-filter-mb"
            maskClosable={true}
            footer={false}
            needDefaultScroll={true}
            closable={false}
            onCancel={onCancelHandler}
          >
            <SliderLayoutPart onCancelHandler={onCancelHandler} />
          </MyModal>
        }
        ComponentPc={
          <section className="slider-layout-container">
            <SliderLayoutPart />
          </section>
        }
      />

      <section className="main-part">
        <RenderByCondition
          ComponentPc={null}
          ComponentMb={
            <div
              onClick={() => {
                setShowModal(true);
                setTimeout(() => {
                  setShowModal2(true);
                }, 50);
              }}
            >
              open
            </div>
          }
        />
        <h1>
          {routerConfig.map(routerInfo => {
            const { path } = routerInfo;
            return (
              <RenderTitle key={path} {...routerInfo} fatherPath={fatherPath} />
            );
          })}
        </h1>
        {children}
      </section>
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
