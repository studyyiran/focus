import { Tree } from "antd";
import React, { useContext, useState } from "react";
import { GodTreeContext, IGodTreeContext } from "../../context";
import { levelupModal } from "../../../targetPage/components/renderLevelUpButtons";

interface IShowTree {}

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
  const { treeList, treeShape } = godTreeContextValue;

  // 最后一个是add功能节点。
  const treeData = [
    ...treeShape,
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
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    // const dropPos = info.node.props.pos.split('-');
    // const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    if (dropKey.indexOf("containerNode") === -1) {
      // 放到了节点上才有效
      return;
    } else {
      const dropContainerId = dropKey.split("-")[1];
      const dragId = dragKey.split("-")[1];
      if (dragKey.indexOf("containerNode") !== -1) {
        // 1）拿起来的是个container节点
        changeTreeShape({
          targetContainerNodeId: dropKey,
          moveContainerNodeId: dragKey,
          containerNodeName: ""
        });
      } else if (dragKey.indexOf("targetNode") !== -1) {
        // 2)拿起来的时候treeNode节点
        const current = treeList.find(treeNode => {
          return treeNode._id === dragId;
        });
        if (current && current.containerNodeId) {
          // 已完成上树 就不需要了。
          changeTargetNodePoint({
            containerNodeId: dropContainerId,
            treeNodeId: dragId,
            treeNodeKeyName: info.something
          });
        } else {
          levelupModal("something", (info: any) => {
            if (info && info.something) {
              changeTargetNodePoint({
                containerNodeId: dropContainerId,
                treeNodeId: dragId,
                treeNodeKeyName: info.something
              });
            }
          });
        }
      } else if (dragKey.indexOf("buttonNode") !== -1) {
        levelupModal("something", (info: any) => {
          // 3)拿起来的是个新增按钮
          if (info && info.something) {
            changeTreeShape({
              targetContainerNodeId: dropKey,
              moveContainerNodeId: "",
              containerNodeName: info.something
            });
          }
        });
      }
    }

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

  const loop = (data: any, key: any, callback: any) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key.indexOf(key) !== -1) {
        return callback(data[i], i, data);
      }
      if (data[i].children) {
        loop(data[i].children, key, callback);
      }
    }
  };
  const expandedKeysArr: any[] = [];
  loop(treeShape, "containerNode", (data: any) => {
    expandedKeysArr.push(data.key);
  });

  return (
    <Tree
      onDrop={onDrop}
      draggable
      autoExpandParent
      defaultExpandParent
      defaultExpandAll
      expandedKeys={expandedKeysArr}
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
