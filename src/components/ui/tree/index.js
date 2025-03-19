import React from "react";
import { Tree } from "antd";
import {
    ApartmentOutlined,
    CarryOutOutlined,
    ClusterOutlined,
    DatabaseOutlined,
    FieldBinaryOutlined, FolderOpenOutlined,
    FundViewOutlined,
    TableOutlined, UsergroupDeleteOutlined
} from "@ant-design/icons";

const { DirectoryTree } = Tree;

const treeData = [
    {
        title: "localhost",
        key: "0",
        icon: <ClusterOutlined />,
        children: [
            {
                title: "Demodb",
                key: "0-0",
                icon: <DatabaseOutlined />,
                children: [
                    {
                        title: "Databases",
                        key: "0-0-0",
                        icon: <CarryOutOutlined />,
                        children: [
                            {
                                title: "Tables",
                                key: "0-0-0-0",
                                icon: <TableOutlined />,
                                children: [
                                    {
                                        title: "game",
                                        key: "0-0-0-0-0",
                                    },
                                    {
                                        title: "code",
                                        key: "0-0-0-0-1",
                                    },
                                    {
                                        title: "event",
                                        key: "0-0-0-0-2",
                                    },
                                ],
                            },
                            {
                                title: "Views",
                                key: "0-0-0-1",
                                icon: <FundViewOutlined />,
                                children: [
                                    {
                                        title: "leaf",
                                        key: "0-0-0-0-0",
                                        icon: <CarryOutOutlined />,
                                    },
                                ],
                            },
                            {
                                title: "Serials",
                                key: "0-0-0-2",
                                icon: <FieldBinaryOutlined />,
                                children: [
                                    {
                                        title: "leaf",
                                        key: "0-0-0-2-0",
                                        icon: <CarryOutOutlined />,
                                    },
                                ],
                            },
                            {
                                title: "Users",
                                key: "0-0-0-3",
                                icon: <UsergroupDeleteOutlined />,
                                children: [
                                    {
                                        title: "leaf",
                                        key: "0-0-0-3-0",
                                        icon: <CarryOutOutlined />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: "Brokers",
        key: "1",
        icon: <ApartmentOutlined />,
        children: [
            {
                title: "leaf",
                key: "1-0",
                icon: <CarryOutOutlined />,
            },
        ],
    },
    {
        title: "Log",
        key: "2",
        icon: <FolderOpenOutlined />,
        children: [
            {
                title: "leaf",
                key: "2-0",
                icon: <CarryOutOutlined />,
            },
        ],
    },
];

const TreeWithLines = () => {
    return (
        <Tree
            showLine={{ showLeafIcon: false }} // Shows lines connecting nodes
            defaultExpandAll
            treeData={treeData}
        />
    );
};

export default TreeWithLines;
