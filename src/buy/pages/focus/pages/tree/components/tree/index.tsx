import { Tree } from "antd";
import React, { useContext, useState } from "react";
import { GodTreeContext, IGodTreeContext } from "../../context";
import {levelupModal} from "../../../targetPage/components/renderLevelUpButtons";

interface IShowTree {
  treeData: any;
}

export const ShowTree: React.FC<IShowTree> = props => {
  // 引入context
  const godTreeContext = useContext(GodTreeContext);
  const {
    godTreeContextValue,
    getTreeList,
    getTreeShape,
    changeTreeShape,
    changeTargetNodePoint
  } = godTreeContext as IGodTreeContext;
  // 最后一个是add功能节点。
  const treeData = [
    ...props.treeData,
    {
      title: (<InputNode />) as any,
      key: "buttonNode-inputelement" as any,
      children: []
    }
  ];

  const onSelect = (selectedKeys: any, info: any) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck = (checkedKeys: any, info: any) => {
    console.log("onCheck", checkedKeys, info);
  };

  const onDrop = (info: any) => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    // const dropPos = info.node.props.pos.split('-');
    // const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    // 放到了节点上才有效

    if (dropKey.indexOf("containerNode") === -1) {
      return;
    } else {
      console.log(dropKey);
      const dropContainerId = dropKey.split("-")[1];
      console.log(dragKey);
      const dragId = dragKey.split("-")[1];
      if (dragKey.indexOf("containerNode") !== -1) {
        console.log("containerNode");
        // 1）拿起来的是个container节点

        /*
                {
                targetContainerNodeId: ,
                containerNodeId: ,
                }
                 */
      } else if (dragKey.indexOf("targetNode") !== -1) {
        console.log("targetNode");
        levelupModal("something", (info: any) => {
          if (info && info.something) {
            changeTargetNodePoint({
              containerNodeId: dropContainerId,
              treeNodeId: dragId,
              treeNodekeyName: info.something,
            });
          }
        });

        // 2)拿起来的时候treeNode节点
        /*
                {
                    targetContainerNodeId: ,
                    treeNodeId: ,
                }
                 */
      } else if (dragKey.indexOf("buttonNode") !== -1) {
        console.log("buttonNode");
        // 3)拿起来的是个新增按钮

        //1）需要有值。

        //2)新增节点。
        /*
                {

                containerNodeName: ,
                moveContainerNodeId: ,
                containerNodeName: ,
                }
                 */
      }
    }

    const loop = (data: any, key: any, callback: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...treeData];

    if (!info.dropToGap) {
      console.log("尾部");
      // Find dragObject
      let dragObj: any;
      loop(data, dragKey, (item: any, index: any, arr: any) => {
        arr.splice(index, 1);
        dragObj = item;
      });
      // Drop on the content
      loop(data, dropKey, (item: any) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj as any);
      });
    }
    console.log(data);
    // this.setState({
    //     gData: data,
    // });
  };

  return (
    <Tree
      onDrop={onDrop}
      draggable
      defaultExpandAll
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
    />
  );
};

const InputNode = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      here
      <input
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
        }}
      />
      here
    </div>
  );
};
