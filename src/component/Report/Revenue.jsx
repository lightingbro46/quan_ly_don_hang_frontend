import { useEffect, useState } from "react";
import { DatePicker, Select, Space, Typography, Button, Form, Table, Flex } from "antd";
import { ExportOutlined, PrinterOutlined } from "@ant-design/icons";

import { apiSearch, handleActionCallback } from "../Common/Utils";

import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(quarterOfYear);

const { Title } = Typography;
const { RangePicker } = DatePicker;

const loadDataFunction = (queryParams) => {
    return apiSearch({
        url: `http://localhost:3000/api/report/revenue`,
        queryParams
    });
}

const Revenue = () => {
    const [form] = Form.useForm();
    const [isExported, setIsExported] = useState(false);
    const [period, setPeriod] = useState(1);
    const [data, setData] = useState([]);

    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const onFormChange = (value) => {
        console.log("onFormChange", value);
        setIsExported(false);
        if (value.period) {
            form.resetFields(["month", "year", "range"])
            setPeriod(value.period);
        }
    }

    const onSubmit = (values) => {
        console.log("onSubmit", values);
        let queryParams = {
            period: values.period
        }

        switch (values.period) {
            case 1:
                queryParams.start_date = dayjs(values.month).startOf("month").format('YYYY-MM-DD');
                queryParams.end_date = dayjs(values.month).endOf("month").format('YYYY-MM-DD');
                break;
            case 2:
                queryParams.start_date = dayjs(values.quarter).startOf("quarter").format('YYYY-MM-DD');
                queryParams.end_date = dayjs(values.quarter).endOf("quarter").format('YYYY-MM-DD');
                break;
            case 3:
                queryParams.start_date = dayjs(values.year).startOf("year").format('YYYY-MM-DD');
                queryParams.end_date = dayjs(values.year).endOf("year").format('YYYY-MM-DD');
                break;
            case 4:
                queryParams.start_date = dayjs(values.range[0]).format('YYYY-MM-DD');
                queryParams.end_date = dayjs(values.range[1]).format('YYYY-MM-DD');
                break;
        }
        console.log(queryParams);
        handleActionCallback(loadDataFunction, queryParams)
            .then(res => {
                setData(res);
                setIsExported(true);
            })
            .catch(e => {
                console.log(e);
                setData([]);
                setIsExported(true);
            })
    }

    const onClickPrint = () => {
        console.log("onClickPrint");
        // export report
    }

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
            width: "60%",
        },
        {
            title: "Số tiền",
            dataIndex: "value",
            key: "value",
            width: "30%",
            render: (value => `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value)}`),
            align: "center"
        }
    ]

    return (
        <>
            <Title level={4} style={{ marginBlockStart: 0 }} >Báo cáo doanh thu, chi phí</Title>
            <Form
                form={form}
                layout="horizontal"
                initialValues={{
                    period: 1,
                }}
                onValuesChange={onFormChange}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 8,
                }}
                style={{
                    marginBlock: "16px",
                    maxWidth: 600
                }}
                onFinish={onSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Chu kỳ"
                    name="period"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn chu kỳ!",
                        },
                    ]}
                >
                    <Select
                        options={[
                            { value: 1, label: "Theo tháng" },
                            { value: 2, label: "Theo quý" },
                            { value: 3, label: "Theo năm" },
                            { value: 4, label: "Tuỳ chọn" },
                        ]}
                        placeholder="Vui lòng chọn chu kỳ"
                    />
                </Form.Item>
                <Form.Item
                    label="Tháng"
                    name="month"
                    rules={[
                        {
                            required: period == 1,
                            message: "Vui lòng chọn tháng!",
                        },
                    ]}
                    hidden={period != 1}
                >
                    <DatePicker
                        picker="month"
                        format="MM/YYYY"
                        placeholder={"Vui lòng chọn tháng"}
                    />
                </Form.Item>
                <Form.Item
                    label="Quý"
                    name="quarter"
                    rules={[
                        {
                            required: period == 2,
                            message: "Vui lòng chọn quý!",
                        },
                    ]}
                    hidden={period != 2}
                >
                    <DatePicker
                        picker="quarter"
                        placeholder={"Vui lòng chọn quý"}
                    />
                </Form.Item>
                <Form.Item
                    label="Năm"
                    name="year"
                    rules={[
                        {
                            required: period == 3,
                            message: "Vui lòng chọn năm!",
                        },
                    ]}
                    hidden={period != 3}
                >
                    <DatePicker
                        picker="year"
                        format="YYYY"
                        placeholder={"Vui lòng chọn năm"}
                    />
                </Form.Item>
                <Form.Item
                    label="Thời gian"
                    name="range"
                    rules={[
                        {
                            required: period == 4,
                            message: "Vui lòng chọn thời gian!",
                        },
                    ]}
                    hidden={period != 4}
                >
                    <RangePicker
                        format="DD/MM/YYYY"
                        placeholder={["Từ ngày", "Đến ngày"]}
                        id={{ start: "start_date", end: "end_date" }}
                    />
                </Form.Item>
                <Form.Item
                    label={null}
                    name=""
                >
                    <Space size={"small"} style={{ height: "32px" }} direction="horizontal">
                        <Form.Item label={null} >
                            <Button type="primary" htmlType="submit" icon={<ExportOutlined />}>Xuất báo cáo</Button>
                        </Form.Item>
                        <Form.Item label={null} hidden={!isExported} onClick={onClickPrint}>
                            <Button type="primary" icon={<PrinterOutlined />}>In</Button>
                        </Form.Item>
                    </Space>
                </Form.Item>
            </Form>
            {(isExported) && (
                <Flex>
                    <Table
                        size="small"
                        style={{
                            width: 600
                        }}
                        columns={columns}
                        rowKey={"id"}
                        dataSource={data}
                        pagination={false}
                        bordered
                    />
                </Flex>
            )}
        </>
    )
}

export default Revenue;