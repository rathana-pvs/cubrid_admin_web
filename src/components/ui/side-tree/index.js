import React, { useState } from 'react';
import {CarryOutOutlined, CheckOutlined, FormOutlined, TableOutlined} from '@ant-design/icons';
import { Select, Switch, Tree } from 'antd';
const treeData = [
    {
        title: 'parent 1',
        key: '0-0',
        icon: <CarryOutOutlined />,
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        icon: <TableOutlined />
                    },
                    {
                        title: 'multiple line title',
                        key: '0-0-0-1',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-2',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-1-0',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
            {
                title: 'parent 1-2',
                key: '0-0-2',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-2-0',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-2-1',
                        icon: <CarryOutOutlined />,
                        switcherIcon: <FormOutlined />,
                    },
                ],
            },
        ],
    },
    {
        title: 'parent 2',
        key: '0-1',
        icon: <CarryOutOutlined />,
        children: [
            {
                title: 'parent 2-0',
                key: '0-1-0',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-1-0-0',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-1-0-1',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
        ],
    },
];
const App = () => {
    const [showLine, setShowLine] = useState(true);
    const [showIcon, setShowIcon] = useState(false);
    const [showLeafIcon, setShowLeafIcon] = useState(true);
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    const handleLeafIconChange = (value) => {
        if (value === 'custom') {
            return setShowLeafIcon(<CheckOutlined />);
        }
        if (value === 'true') {
            return setShowLeafIcon(true);
        }
        return setShowLeafIcon(false);
    };
    return (
        <div>

            <Tree
                showLine
                showIcon
                defaultExpandedKeys={['0-0-0']}
                onSelect={onSelect}
                treeData={treeData}
            />
        </div>
    );
};
export default App;