import { useEffect, useState } from "react";
import { Space, Flex, DatePicker, Tag, Typography, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import LoadTable from "../Common/LoadTable";
import { apiSearch, handleActionCallback } from "../Common/Utils";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const loadDataForTableFunction = (queryParams) => {
    return apiSearch({
        url: `http://localhost:3000/api/report/award`,
        queryParams
    });
}

const Award = () => {
    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "5%",
            fixed: "left",
        },
        {
            title: "Tên tài xế",
            dataIndex: "name",
            key: "name",
            width: "15%",
            fixed: "left",
        },
        {
            title: "CCCD",
            dataIndex: "identification",
            key: "identification",
            width: "10%",
        },
        {
            title: "Số chuyến đã vận chuyển",
            dataIndex: "delivers",
            key: "delivers",
            width: "20%",
            align: 'center'
        },
        {
            title: "Số chuyến vượt chỉ tiêu",
            key: "delivers_overs",
            width: "20%",
            render: ((_, record) => `${record["delivers"] - 20 > 0 ? (record["delivers"] - 20) : 0}`),
            align: 'center'
        },
        {
            title: "Đạt chỉ tiêu khen thưởng",
            key: "is_award",
            width: "20%",
            render: ((_, record) => (
                (record["delivers"] - 20 > 0) && <CheckCircleOutlined style={{ fontSize: "16px" }} />
            )),
            align: 'center',
            fixed: "right",
        }
    ]

    return (
        <>
            <Title level={2} >Báo cáo khen thưởng tài xế</Title>
            <Title level={5}>Khoảng thời gian:</Title>
            <Space size={"middle"} style={{ marginBottom: 32 }}>
                <RangePicker format="DD/MM/YYYY" placeholder={["Từ ngày", "Đến ngày"]} value={[dayjs("2024-10-1"), dayjs("2024-12-31")]} />
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

export default Award;