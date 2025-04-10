import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import DatabaseVolumes from "@/components/ui/contents/servers/DatabaseVolumes";
import Brokers from "@/components/ui/contents/servers/Brokers";
import SystemStatus from "@/components/ui/contents/servers/SystemStatus";

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
        children: <SystemStatus />,
        style: panelStyle,
    },
    {
        key: '5',
        label: <b>System Info</b>,
        children: <SystemStatus />,
        style: panelStyle,
    },
];
const Index = () => {
    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 8,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };
    return (
        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{
                background: token.colorBgContainer,
            }}
            items={getItems(panelStyle)}
        />
    );
};
export default Index;