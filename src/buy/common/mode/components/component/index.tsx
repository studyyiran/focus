import React from "react";

interface IComponent {

}

export const Component: React.FC<IComponent> = props => {
  return <div className="component-style">Component</div>
}