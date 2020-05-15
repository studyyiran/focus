import React from "react";
import './index.less';

interface IComponent {

}

export const Component: React.FC<IComponent> = props => {
  return <div className="component-style">Component</div>
}