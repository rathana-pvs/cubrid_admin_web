import React, { useState } from 'react';
import {Layout, theme} from 'antd';
import Sidebar from "@/components/layout/Sidebar";
import AppBar from "@/components/layout/AppBar";

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
           <Sidebar/>
    );
};
export default AppLayout;