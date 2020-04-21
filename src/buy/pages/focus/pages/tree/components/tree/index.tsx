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

    return (
        <Tree
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={treeData}
        />
    );
}