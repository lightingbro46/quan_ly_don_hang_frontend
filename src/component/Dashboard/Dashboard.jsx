import React, { useState } from "react";
import { Flex, Card } from "antd";

const DashboardItems = [
    {
        key: "customer",
        lable: "Khách hàng",
    },
    {
        key: "order",
        lable: "Đơn hàng",
    },
    {
        key: "user",
        lable: "Nhân viên",
    },
    {
        key: "Driver",
        lable: "Tài xế",
    },
    {
        key: "Truck",
        lable: "Xe tải",
    },
    {
        key: "truckUnavailabel",
        lable: "Xe tải đang bảo dưỡng",
    },
]
const Dashboard = ({ profile }) => {
    return (
        <Flex
            wrap
            gap="16px"
            justify="space-between"
            style={{
                padding: '16px',
                background: '#f0f2f5',
            }}>
            {DashboardItems.map(val => {
                <Card>

                </Card>
            })}

        </Flex>
    )
}

export default Dashboard;
