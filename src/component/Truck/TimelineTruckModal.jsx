import { useState } from "react";
import { Modal, DatePicker, Space, Tag, Select, Button, Form } from "antd";

import dayjs from "dayjs";

import { apiSearch } from "../Common/Utils";
import LoadTable from "../Common/LoadTable";

const { RangePicker } = DatePicker;

const loadDataForTableFunction = (queryParams) => {
    return apiSearch({
        url: "http://localhost:3000/api/orders/list",
        queryParams
    })
}

const orderStatusOptions = [
    {
        value: 1,
        label: "Đã tiếp nhận"
    },
    {
        value: 2,
        label: "Đang lấy hàng"
    },
    {
        value: 3,
        label: "Đang vận chuyển"
    },
    {
        value: 4,
        label: "Đã trả hàng"
    },
    {
        value: 5,
        label: "Đã huỷ đơn"
    }
]

const TimelineModal = ({ isModalVisible, setIsModalVisible }) => {
    const [reload, setReload] = useState(true);
    const triggerReload = () => setReload(pre => !pre);
    const [form] = Form.useForm();
    const [select, setSelect] = useState(1);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "5%",
            fixed: 'left',
        },
        {
            title: "Thời gian nhận-trả hàng",
            width: "20%",
            render: (text, record) => `${dayjs(record.start_date).format('DD/MM/YYYY')} - ${dayjs(record.end_date).format('DD/MM/YYYY')}`,
            fixed: 'left',
        },
        {
            title: "Tài xế",
            dataIndex: "driver.name",
            key: "driver_name",
            width: "10%",
        },
        {
            title: "Khách hàng",
            dataIndex: "customer.name",
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
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <>
                    {(status == orderStatusOptions[0]["value"]) && (
                        <Tag color="processing">
                            {orderStatusOptions[0]["label"]}
                        </Tag>
                    )}
                    {(status == orderStatusOptions[1]["value"]) && (
                        <Tag color="processing">
                            {orderStatusOptions[1]["label"]}
                        </Tag>
                    )}
                    {(status == orderStatusOptions[2]["value"]) && (
                        <Tag color="processing">
                            {orderStatusOptions[2]["label"]}
                        </Tag>
                    )}
                    {(status == orderStatusOptions[3]["value"]) && (
                        <Tag color="success">
                            {orderStatusOptions[3]["label"]}
                        </Tag>
                    )}
                    {(status == orderStatusOptions[4]["value"]) && (
                        <Tag color="error">
                            {orderStatusOptions[4]["label"]}
                        </Tag>
                    )}
                </>
            ),
            width: "5%",
            align: 'center',
            fixed: "right"
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
                layout="inline"
                initialValues={{
                    filter: 1,
                }}
                onValuesChange={onFormChange}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    marginBlock: "16px",
                    maxWidth: 600
                }}
                onFinish={onSubmit}
                autoComplete="off"
            >
                <Space size={"small"}>
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
                </Space>
            </Form>
            <LoadTable
                columns={columns}
                loadDataForTableFunction={loadDataForTableFunction}
                reload={reload} />
        </Modal>
    )
}

export default TimelineModal;