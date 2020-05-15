import React from "react";
import "./index.less";

interface IProgress {
  max: Number;
  current: Number;
}

export const Progress: React.FC<IProgress> = props => {
  const { max, current } = props;
  // @ts-ignore
  const style = { width: `${(100 * current) / max}%` };
  return (
    <div className="progress-container">
      <div className="progress-out">
        <div className="inner" style={style} />
      </div>
      <span>
          {current} / {max}
        </span>
    </div>
  );
};
