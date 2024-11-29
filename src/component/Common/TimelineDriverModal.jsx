import { useState } from "react";
import { Modal, DatePicker, Space, Tag, Select, Button, Form } from "antd";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { apiSearch } from "./Utils";
import LoadTable from "./LoadTable";

import { timeline_driver, driver_data } from "../mock";

const { RangePicker } = DatePicker;

const loadingDataFunction = (queryParams) => {
    return new Promise(resolve => resolve(timeline_driver));
    return apiSearch({
        url: "http://localhost:3000/api/orders/list",
        queryParams
    })
}

const TimelineModal = ({ isModalVisible, setIsModalVisible }) => {
    const [reload, setReload] = useState(true);
    const triggerReload = () => setReload(pre => !pre);
    const [form] = Form.useForm();
    const [select, setSelect] = useState(1);
    const record = driver_data.results[0];
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "id",
            key: "id",
            width: "5%",
            fixed: 'left',
        },
        {
            title: "Thời gian nhận hàng",
            dataIndex: "start_date",
            key: "arrival",
            width: "10%",
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
            fixed: 'left',
        },
        {
            title: "Thời gian trả hàng",
            dataIndex: "end_date",
            key: "arrival",
            width: "10%",
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
            fixed: 'left',
        },
        {
            title: "Xe tải",
            dataIndex: "truck_license_plate",
            key: "truck_license_plate",
            width: "10%",
        },
        {
            title: "Khách hàng",
            dataIndex: "customer_name",
            key: "customer_name",
            width: "10%",

        },
        {
            title: "Điểm nhận hàng",
            dataIndex: "departure",
            key: "departure",
            width: "15%",
        },
        {
            title: "Điểm trả hàng",
            dataIndex: "arrival",
            key: "arrival",
            width: "10%",
        },
        {
            title: "Mặt hàng",
            dataIndex: "material",
            key: "material",
            width: "10%",
        },
        {
            title: "Khối lượng (tấn)",
            dataIndex: "weight",
            key: "weight",
            width: "10%",
        },
        {
            title: "Trạng thái vận chuyển",
            dataIndex: "deliver_status",
            key: "deliver_status",
            render: (status) => (
                <Space size="small">
                    {(status == 1) && (
                        <Tag icon={<ClockCircleOutlined />} color="default">
                            Chờ vận chuyển
                        </Tag>
                    )}
                    {(status == 2) && (
                        <Tag icon={<SyncOutlined spin />} color="processing">
                            Đang vận chuyển
                        </Tag>
                    )}
                    {(status == 3) && (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            Đã trả hàng
                        </Tag>
                    )}
                    {(status == 4) && (
                        <Tag icon={<MinusCircleOutlined />} color="error">
                            Đã huỷ
                        </Tag>
                    )}
                </Space>
            ),
            width: "10%",
            fixed: 'right',
        }
    ]

    const onFormChange = (values) => {
        console.log(values);
        if (values.filter && values.filter != select) {
            form.resetFields(["day", "month", "year"]);
            setSelect(values.filter);
        }
    }

    const onSubmit = (values) => {

    }

    return (
        <Modal
            title={`Lịch trình hoat động`}
            width={"80vw"}
            height={"70vh"}
            footer={null}
            open={isModalVisible}
            onCancel={handleCancel}
            centered
        >
            <Form
                form={form}
                layout="horizontal"
                initialValues={{
                    filter: 1,
                }}
                onValuesChange={onFormChange}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    marginBlock: "16px",
                    maxWidth: 400
                }}
                onFinish={onSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Bộ lọc"
                    name="filter"
                >
                    <Select
                        options={[
                            { value: 0, label: "30 ngày tiếp theo" },
                            { value: 1, label: "30 ngày vừa qua" },
                            { value: 2, label: "Theo ngày" },
                            { value: 3, label: "Theo tháng" },
                            { value: 4, label: "Theo năm" },
                            { value: 5, label: "Tuỳ chọn" },
                        ]}
                        placeholder="Vui lòng chọn bộ lọc"
                    />
                </Form.Item>
                <Form.Item
                    label="Ngày"
                    name="day"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn ngày!",
                        },
                    ]}
                    hidden={select != 2}
                >
                    <DatePicker
                        picker="date"
                        format="DD/MM/YYYY"
                        placeholder={"Chọn ngày"}
                    />
                </Form.Item>
                <Form.Item
                    label="Tháng"
                    name="month"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn tháng!",
                        },
                    ]}
                    hidden={select != 3}
                >
                    <DatePicker
                        picker="month"
                        format="MM/YYYY"
                        placeholder={"Vui lòng chọn tháng"}
                    />
                </Form.Item>
                <Form.Item
                    label="Năm"
                    name="year"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn năm!",
                        },
                    ]}
                    hidden={select != 4}
                >
                    <DatePicker
                        picker="year"
                        format="YYYY"
                        placeholder={"Vui lòng chọn năm"}
                    />
                </Form.Item>
                <Form.Item
                    label="Khoảng thời gian"
                    name="range_time"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn thời gian vân chuyển!",
                        },
                    ]}
                    hidden={select != 5}
                >
                    <RangePicker
                        format="DD/MM/YYYY"
                        placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                        id={{ start: "start_date", end: "end_date" }}
                    />
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary">Lọc</Button>
                </Form.Item>
            </Form>
            <LoadTable columns={columns} loadingDataFunction={loadingDataFunction} reload={reload} />
        </Modal>
    )
}

export default TimelineModal;