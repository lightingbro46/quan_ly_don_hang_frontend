import React, { useState } from "react";
import { Layout, theme, Avatar, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const HeaderBar = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
            }}
        >
            <Flex
                style={{
                    width: "100%",
                    height: "100%",
                }}
                align="center"
                justify="flex-end"
            >
                <Avatar
                    style={{
                        backgroundColor: "#87d068",
                        width: "32px",
                        height: "32px",
                    }}
                    icon={<UserOutlined />}
                    alt="user avatar"
                />
                <Flex
                    vertical
                    style={{
                        width: "15vw",
                        height: "100%",
                        fontSize: "16px",
                        lineHeight: "19px",
                    }}
                    align="flex-start"
                    justify="space-evenly"
                >
                    <p
                        style={{
                            margin: 0,
                            padding: "0 16px",
                        }}
                    >
                        Nguyễn Công Nghĩa
                    </p>
                    <p
                        style={{
                            margin: 0,
                            padding: "0 16px",
                            fontWeight: "bold",
                        }}
                    >
                        Admin
                    </p>
                </Flex>
            </Flex>
        </Header>
    )
}

export default HeaderBar;