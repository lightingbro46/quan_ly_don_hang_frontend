import { useEffect, useState } from "react";
import { DatePicker, Flex, Space, Typography, Button } from "antd";
import LoadTable from "../Common/LoadTable";
import { apiSearch, handleActionCallback } from "../Common/Utils";

import { revenue_data } from "../mock";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const loadDataForTableFunction = (queryParams) => {
    return new Promise((resolve, reject) => resolve(revenue_data))
    return apiSearch({
        url: `http://localhost:3000/api/trucks/list`,
        queryParams
    });
}

const Revenue = () => {
    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const columns = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            width: "10%",
        },
        {
            title: "Chỉ tiêu",
            dataIndex: "key",
            key: "key",
            width: "30%",
        },
        {
            title: "Số tiền",
            dataIndex: "value",
            key: "value",
            width: "70%",
            render: (value => `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value)}`),
        }
    ]

    return (
        <>
            <Title level={2} >Báo cáo doanh thu, chi phí</Title>
            <Title level={5}>Khoảng thời gian:</Title>
            <Space size={"middle"} style={{ marginBottom: 32 }}>
                <RangePicker format="DD/MM/YYYY" placeholder={["Từ ngày", "Đến ngày"]} value={[dayjs("2024-1-1"), dayjs("2024-12-31")]} />
                <Button type="primary">
                    Xuất báo cáo
                </Button>
                <Button type="primary">
                    In
                </Button>
            </Space>
            <Space />
            <LoadTable
                columns={columns}
                loadDataForTableFunction={loadDataForTableFunction}
                reload={reload}
            />
        </>
    )
}

export default Revenue;