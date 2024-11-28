import { useState } from "react";
import { Layout, Menu } from "antd";
import {
    ProjectOutlined,
    SnippetsOutlined,
    PushpinOutlined,
    TeamOutlined,
    TruckOutlined,
    UserOutlined,
    BarChartOutlined,
    ContactsOutlined,
    FundOutlined,
    GiftOutlined
} from "@ant-design/icons";

import logo from "../../assets/images/react.svg";

export const MenuItems = [
    { key: "Dashboard", label: "Dashboard", icon: <ProjectOutlined />, children: undefined },
    { key: "Order", label: "Đơn hàng", icon: <SnippetsOutlined />, children: undefined },
    { key: "Customer", label: "Khách hàng", icon: <ContactsOutlined />, children: undefined },
    { key: "Driver", label: "Tài xế", icon: <TeamOutlined />, children: undefined },
    { key: "Truck", label: "Xe tải", icon: <TruckOutlined />, children: undefined },
    { key: "User", label: "Nhân viên", icon: <UserOutlined />, children: undefined },
    { key: "Cost", label: "Định mức", icon: <PushpinOutlined />, children: undefined },
    {
        key: "Report", label: "Báo cáo", icon: <BarChartOutlined />,
        children: [
            { key: 'Revenue', label: 'Doanh thu, chi phí', icon: <FundOutlined /> },
            { key: 'Award', label: 'Khen thưởng', icon: <GiftOutlined /> },
        ],
    },
]

const { Sider } = Layout;

const SiderBar = ({ current, setCurrent }) => {
    const [collapsed, setCollapsed] = useState(false);

    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (<Sider
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