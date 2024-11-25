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
            {DashboardItems.map((val, index) => {
                <Card
                    key={index}
                    title={`Item ${index + 1}`}
                    style={{
                        flex: '1 1 calc(33.33% - 16px)', // Chia đều mỗi cột thành 1/3
                        maxWidth: 'calc(33.33% - 16px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}>
                    {123456}
                </Card>
            })}

        </Flex>
    )
}

export default Dashboard;
