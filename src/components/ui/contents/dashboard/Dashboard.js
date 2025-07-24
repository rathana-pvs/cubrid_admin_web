import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import DatabaseVolumes from "@/components/ui/contents/dashboard/DatabaseVolumes";
import SystemStatus from "@/components/ui/contents/dashboard/SystemStatus";
import Brokers from "@/components/ui/contents/dashboard/Brokers";
import SystemInfo from "@/components/ui/contents/dashboard/SystemInfo";
import Databases from "@/components/ui/contents/dashboard/Databases";


const getItems = (panelStyle) => [
    {
        key: '1',
        label: <b>Database Volumes</b>,
        children: <DatabaseVolumes />,
        style: panelStyle,
    },
    {
        key: '2',
        label: <b>Brokers</b>,
        children: <Brokers />,
        style: panelStyle,
    },
    {
        key: '3',
        label: <b>System Status</b>,
        children: <SystemStatus />,
        style: panelStyle,
    },
    {
        key: '4',
        label: <b>Databases</b>,
        children: <Databases />,
        style: panelStyle,
    },
    {
        key: '5',
        label: <b>System Info</b>,
        children: <SystemInfo/>,
        style: panelStyle,
    },
];
const Index = () => {
    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 8,
    };
    return (
        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            items={getItems(panelStyle)}
        />
    );
};
export default Index;