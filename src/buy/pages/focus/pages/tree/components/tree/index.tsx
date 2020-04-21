import { Tree } from 'antd';
import React from 'react';

interface IShowTree {
    treeData: any
}

export const ShowTree: React.FC<IShowTree> = props => {
    const {treeData} = props;

    const onSelect = (selectedKeys: any, info: any) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck = (checkedKeys: any, info: any) => {
        console.log('onCheck', checkedKeys, info);
    };

    const onDrop = (info: any) => {
        console.log(info);
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        // const dropPos = info.node.props.pos.split('-');
        // const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

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
            console.log('尾部')
            // Find dragObject
            let dragObj : any;
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
        console.log(data)
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
}