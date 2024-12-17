import { useEffect, useState } from "react";
import { Space, Flex, DatePicker, Tag, Typography, Button, Form, Table, Select, InputNumber } from "antd";
import { CheckCircleOutlined, ExportOutlined, PrinterOutlined } from "@ant-design/icons";

import { apiSearch, handleActionCallback } from "../Common/Utils";

import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(quarterOfYear);

const { Title } = Typography;
const { RangePicker } = DatePicker;

const loadDataFunction = (queryParams) => {
    return apiSearch({
        url: `http://localhost:3000/api/report/award`,
        queryParams
    });
}

const Award = () => {
    const [form] = Form.useForm();
    const [isExported, setIsExported] = useState(false);
    const [period, setPeriod] = useState(1);
    const [data, setData] = useState([]);
    const [target, setTarget] = useState(20);

    const onFormChange = (value) => {
        console.log("onFormChange", value);
        setIsExported(false);
        if (value.period) {
            form.resetFields(["month", "quarter", "year", "range"])
            setPeriod(value.period);
        }
        if (value.target) {
            setTarget(value.target);
        }
    }

    const onSubmit = (values) => {
        console.log("onSubmit", values);
        let queryParams = {
            period: values.period,
            target: values.target
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
                console.log(res);
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
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "5%",
        },
        {
            title: "Tên tài xế",
            dataIndex: "name",
            key: "name",
            width: "20%",
        },
        {
            title: "CCCD",
            dataIndex: "identification",
            key: "identification",
            width: "20%",
        },
        {
            title: "Số chuyến đã vận chuyển",
            key: "delivers",
            render: ((_, record) => record["orders"].length),
            width: "20%",
            align: 'center'
        },
        {
            title: "Số chuyến vượt chỉ tiêu",
            key: "delivers_overs",
            render: ((_, record) => (record["orders"].length >= target) ? (record["orders"].length - target) : 0),
            width: "20%",
            align: 'center'
        },
        {
            title: "Đạt chỉ tiêu khen thưởng",
            key: "is_got_target",
            width: "20%",
            render: ((_, record) => (
                (record["orders"].length >= target) && <CheckCircleOutlined style={{ fontSize: "16px" }} />
            )),
            align: 'center',
        }
    ]

    return (
        <>
            <Title level={4} style={{ marginBlockStart: 0 }}>Báo cáo khen thưởng tài xế</Title>
            <Form
                form={form}
                layout="horizontal"
                initialValues={{
                    period: 1,
                    target: 20
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
                    label="Chỉ tiêu"
                    name="target"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập chỉ tiêu!",
                        },
                    ]}
                >
                    <InputNumber placeholder="Vui lòng nhập chỉ tiêu" />
                </Form.Item>
                <Form.Item
                    label={null}
                    name=""
                >
                    <Space size={"small"} style={{ height: "32px" }} direction="horizontal">
                        <Form.Item label={null} >
                            <Button type="primary" htmlType="submit" icon={<ExportOutlined />}>Xuất báo cáo</Button>
                        </Form.Item>
                        {/* <Form.Item label={null} hidden={!isExported} onClick={onClickPrint}>
                            <Button type="primary" icon={<PrinterOutlined />}>In báo cáo</Button>
                        </Form.Item> */}
                    </Space>
                </Form.Item>
            </Form>
            {(isExported) && (
                <Table
                    size="small"
                    columns={columns}
                    rowKey={"id"}
                    dataSource={data}
                    pagination={false}
                    bordered
                />
            )}
        </>
    )
}

export default Award;