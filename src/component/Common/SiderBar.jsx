import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
    ProjectOutlined,
    SnippetsOutlined,
    PushpinOutlined,
    TeamOutlined,
    TruckOutlined,
    UserOutlined,
    BarChartOutlined,
    ContactsOutlined
} from "@ant-design/icons";

import logo from "../../assets/images/react.svg";

export const MenuItems = [
    { key: "Dashboard", label: "Dashboard", icon: <ProjectOutlined />, children: undefined },
    { key: "Order", label: "Quản lý đơn hàng", icon: <SnippetsOutlined />, children: undefined },
    { key: "Customer", label: "Quản lý khách hàng", icon: <ContactsOutlined />, children: undefined },
    { key: "Driver", label: "Quản lý tài xế", icon: <TeamOutlined />, children: undefined },
    { key: "Truck", label: "Quản lý xe tải", icon: <TruckOutlined />, children: undefined },
    { key: "Cost", label: "Đinh mức chi phí", icon: <PushpinOutlined />, children: undefined },
    { key: "Report", label: "Báo cáo", icon: <BarChartOutlined />, children: undefined },
    { key: "User", label: "Quản lý người dùng", icon: <UserOutlined />, children: undefined },
]

const { Sider } = Layout;

const SiderBar = ({ current, setCurrent }) => {
    const [collapsed, setCollapsed] = useState(false);

    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (<Sider
        style={{
            // overflow: "auto",
            // height: "100vh",
            // position: "fixed",
            // insetInlineStart: 0,
            // top: 0,
            // bottom: 0,
            // scrollbarWidth: "thin",
            // scrollbarGutter: "stable",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
    >
        <div
            style={{
                margin: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <img src={logo} alt="logo image" width="64px" />
        </div>
        <Menu
            theme="dark"
            selectedKeys={[current]}
            mode="inline"
            items={MenuItems}
            onClick={onClick}
        />
    </Sider>
    )
}

export default SiderBar;