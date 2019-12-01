import React, { useContext, useEffect } from "react";
import "./index.less";

export function TodoLine(props: any) {
  const { tag, content } = props;
  return (
    <>
      <span>《{tag}》</span>
      <span>{content}</span>
    </>
  );
}
