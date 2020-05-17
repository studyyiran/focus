import React from "react";
import "./index.less";

interface IProgress {
  max: any;
  current: any;
}

export const Progress: React.FC<IProgress> = props => {
  const { max, current } = props;
  // @ts-ignore
  return (
    <div className="progress-container">
      <div className="progress-out">
        <div className="inner" style={{ width: `${(100 * current) / max}%` }} />
      </div>
      <span>
          {current} / {max}
        </span>
    </div>
  );
};
