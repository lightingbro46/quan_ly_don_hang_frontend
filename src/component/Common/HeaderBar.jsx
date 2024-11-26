import { useState } from "react";
import { Layout, theme, Avatar, Flex, Dropdown, Space, Button } from "antd";
import { UserOutlined, DownOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";

import avatar from "../../assets/images/avatar.svg";

const { Header } = Layout;

const HeaderBar = ({ profile, setProfile }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items = [
        {
            key: '0',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            onClick: () => setProfile()
        },
    ];

    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
                paddingRight: "32px"
            }}
        >
            <Flex
                vertical={false}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                align="center"
                justify="flex-end"
            >
                <Space
                    size="middle"

                >
                    <Button size="large" type="text">
                        <Space
                            size="middle"
                            style={{
                                alignContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Avatar
                                style={{
                                    width: '24px',
                                    height: '24px',
                                }}
                                src={avatar}
                                alt="user avatar"
                            />
                            {profile.fullname}
                        </Space>
                    </Button>
                    <Dropdown menu={{ items }}>
                        <Button
                            type="text"
                            size="large"
                            shape="circle"
                            icon={<SettingOutlined />}
                        />
                    </Dropdown>
                </Space>
            </Flex>
        </Header >
    )
}

export default HeaderBar;