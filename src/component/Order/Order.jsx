import { useEffect, useState } from "react";
import { Space, Form, Input, Select, Tooltip, Tag, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, PrinterOutlined } from "@ant-design/icons"
import dayjs from "dayjs";

import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";
import SearchInput from "../Common/SearchInput";
import { apiSearch, handleActionCallback } from "../Common/Utils";

const { RangePicker } = DatePicker;

const loadFunction = (queryParams) => {
    return apiSearch({
        url: 'http://localhost:3000/api/orders/list',
        queryParams
    });
}

const getFunction = (id) => {
    return apiSearch({
        url: "http://localhost:3000/api/orders/detail",
        queryParams: { id }
    });
}

const createFunction = (values) => {
    return apiSearch({
        url: "http://localhost:3000/api/orders/add",
        method: "POST",
        bodyParams: values
    });
}

const updateFunction = (values) => {
    return apiSearch({
        url: "http://localhost:3000/api/orders/update",
        method: "POST",
        queryParams: { id: values.id },
        bodyParams: values
    })
}

const deleteFunction = (id) => {
    return apiSearch({
        url: "http://localhost:3000/api/orders/delete",
        queryParams: { id }
    })
}

const loadOptionTruckCatFunction = (queryParams) => {
    return apiSearch({
        url: "http://localhost:3000/api/truck_cats/list",
        queryParams
    })
}

const loadOptionTruckFunction = (queryParams) => {
    return apiSearch({
        url: "http://localhost:3000/api/trucks/list",
        queryParams
    })
}

const loadOptionDriverFunction = (queryParams) => {
    return apiSearch({
        url: "http://localhost:3000/api/drivers/list",
        queryParams
    })
}

const loadOptionCostFunction = (queryParams) => {
    return apiSearch({
        url: "http://localhost:3000/api/costs/list",
        queryParams
    })
}

const loadOptionCustomerFunction = (queryParams) => {
    return apiSearch({
        url: "http://localhost:3000/api/customers/list",
        queryParams
    })
}

const printInvoice = (value) => {

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

const paymentStatusOptions = [
    {
        value: 1,
        label: "Chờ thanh toán"
    },
    {
        value: 2,
        label: "Đã thanh toán"
    },
    {
        value: 3,
        label: "Đã hoàn tiền"
    }
]

const Order = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [inputModalData, setInputModalData] = useState({});

    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const [formCreate] = Form.useForm();
    const [formUpdate] = Form.useForm();

    const [optionsTruckCat, setOptionsTruckCat] = useState([]);
    const [optionsTruck, setOptionsTruck] = useState([]);
    const [optionsCost, setOptionsCost] = useState([]);
    const [optionsCustomer, setOptionsCustomer] = useState([]);
    const [optionsDriver, setOptionsDriver] = useState([]);

    const showCreateModal = () => {
        setInputModalData({});
        setIsCreateModalVisible(true);
    }

    const showUpdateModal = (record) => {
        console.log(record)
        formUpdate.setFieldsValue(record);
        setInputModalData(record);
        setIsUpdateModalVisible(true);
    }

    const onValuesChange = (value) => {

    }

    const onCreateSubmit = (values) => {
        handleActionCallback(createFunction, values)
            .then(() => {
                setIsCreateModalVisible(false);
                formCreate.resetFields();
                triggerReload();
            }).catch(e => { })
    };

    const onUpdateSubmit = (values) => {
        handleActionCallback(updateFunction, values)
            .then(() => {
                setInputModalData({});
                setIsUpdateModalVisible(false);
                formUpdate.resetFields();
                triggerReload();
            }).catch(e => { })
    };

    const onDeleteSubmit = (id) => {
        handleActionCallback(deleteFunction, id)
            .then(() => {
                triggerReload();
            }).catch(e => { })
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
            title: "Khách hàng",
            dataIndex: "customer_name",
            key: "customer_name",
            width: "10%",
            fixed: 'left',
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
            width: "15%",
        },
        {
            title: "Thời gian nhận hàng",
            dataIndex: "start_date",
            key: "arrival",
            width: "10%",
            render: (text) => dayjs(text).format('DD/MM/YYYY')
        },
        {
            title: "Thời gian trả hàng",
            dataIndex: "end_date",
            key: "arrival",
            width: "10%",
            render: (text) => dayjs(text).format('DD/MM/YYYY')
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
            title: "Xe tải",
            dataIndex: "truck_license_plate",
            key: "truck_license_plate",
            width: "10%",
        },
        {
            title: "Tài xế",
            dataIndex: "driver_name",
            key: "driver_name",
            width: "10%",
        },
        {
            title: "Giá thành",
            dataIndex: "pricing",
            key: "pricing",
            render: (value => `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value)}`),
            width: "10%",
        },
        {
            title: "Chi phí",
            dataIndex: "tolls",
            key: "tolls",
            render: (value => `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value)}`),
            width: "10%",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <>
                    {(status == orderStatusOptions[0]["value"]) && (
                        <Tag color="default">
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
        },
        {
            title: "Thanh toán",
            dataIndex: "payment_status",
            key: "payment_status",
            render: (status) => (
                <>
                    {(status == paymentStatusOptions[0]["value"]) && (
                        <Tag color="processing">
                            {paymentStatusOptions[0]["label"]}
                        </Tag>
                    )}
                    {(status == paymentStatusOptions[1]["value"]) && (
                        <Tag color="success">
                            {paymentStatusOptions[1]["label"]}
                        </Tag>
                    )}
                    {(status == paymentStatusOptions[2]["value"]) && (
                        <Tag color="default">
                            {paymentStatusOptions[2]["label"]}
                        </Tag>
                    )}
                </>
            ),
            width: "5%",
            align: 'center',
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip placement="topLeft" title="Cập nhật">
                        <a onClick={() => showUpdateModal(record)}>
                            <EditOutlined />
                        </a>
                    </Tooltip>
                    <Tooltip placement="top" title="Xoá">
                        <a onClick={() => showDeleteConfirm({
                            object: "đơn hàng",
                            data: record,
                            labelInKeys: [{
                                label: "Mã đơn hàng",
                                key: "id"
                            }],
                            onDeleteSubmit: onDeleteSubmit
                        })}>
                            <DeleteOutlined />
                        </a>
                    </Tooltip>
                    <Tooltip placement="topRight" title="In hoá đơn">
                        <a onClick={() => printInvoice(record)}>
                            <PrinterOutlined />
                        </a>
                    </Tooltip>
                </Space >
            ),
            width: "15%",
            align: 'center',
            fixed: 'right',
        },
    ]

    const createFormList = (
        <Form
            form={formCreate}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            onFinish={onCreateSubmit}
            onValuesChange={onValuesChange}
            autoComplete="off"
        >
            <Form.Item
                label="Tên khách hàng"
                name="customer_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn khách hàng!",
                    },
                ]}
            //todo: render
            >
                <SearchInput
                    loadFunction={loadOptionCustomerFunction}
                    labelInKeys={['id', "name"]}
                    placeholder="Vui lòng chọn khách hàng"
                />
            </Form.Item>
            <Form.Item
                label="Địa điểm nhận hàng"
                name="departure"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập địa điểm nhận hàng!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập địa điểm nhận hàng" />
            </Form.Item>
            <Form.Item
                label="Địa điểm trả hàng"
                name="arrival"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập địa điểm trả hàng!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập địa điểm trả hàng" />
            </Form.Item>
            <Form.Item
                label="Tuyến đường"
                name="cost_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn tuyến đường!",
                    },
                ]}
            //todo: render
            >
                <SearchInput
                    loadFunction={loadOptionCostFunction}
                    loadOptionsFirst={true}
                    labelInKeys={["id", "province", "arrival"]}
                    placeholder="Vui lòng chọn tuyến đường"
                />
            </Form.Item>
            <Form.Item
                label="Mặt hàng"
                name="material"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập mặt hàng!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập mặt hàng" />
            </Form.Item>
            <Form.Item
                label="Khối lượng (Tấn)"
                name="weight"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập khối lượng!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập khối lượng" />
            </Form.Item>
            <Form.Item
                label="Thời gian vận chuyển"
                name="deliver_time"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn thời gian vân chuyển!",
                    },
                ]}
            //todo: render
            >
                <RangePicker
                    format="DD/MM/YYYY"
                    placeholder={["Ngày nhận hàng", "Ngày trả hàng"]}
                    id={{ start: "start_date", end: "end_date" }}
                />
            </Form.Item>
            <Form.Item
                label="Loại xe"
                name="cat_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn loại xe!",
                    },
                ]}
            //todo: render
            >
                <SearchInput
                    loadFunction={loadOptionTruckCatFunction}
                    loadOptionsFirst={true}
                    labelInKeys={["id", "name"]}
                    placeholder="Vui lòng chọn loại xe"
                />
            </Form.Item>
            <Form.Item
                label="Xe tải"
                name="truck_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn xe tải!",
                    },
                ]}
            //todo: render
            >
                <SearchInput
                    loadFunction={loadOptionTruckFunction}
                    loadOptionsFirst={true}
                    labelInKeys={["id", "license_plate"]}
                    placeholder="Vui lòng chọn xe tải"
                />
            </Form.Item>
            <Form.Item
                label="Tài xế"
                name="driver_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn tài xế!",
                    },
                ]}
            >
                <SearchInput
                    loadFunction={loadOptionTruckFunction}
                    loadOptionsFirst={true}
                    labelInKeys={["id", "name"]}
                    placeholder="Vui lòng chọn tài xế"
                />
            </Form.Item>
            <Form.Item
                label="Chi phí"
                name="tolls"
                rules={[
                    {
                        required: true,
                        message: "Chi phí được tính dựa trên tuyến đường!",
                    },
                ]}
            >
                <Input disabled placeholder="Chi phí được tính dựa trên tuyến đường" />
            </Form.Item>
            <Form.Item
                label="Giá thành"
                name="pricing"
                rules={[
                    {
                        required: true,
                        message: "Giá thành được tính dựa trên tuyến đường!",
                    },
                ]}
            >
                <Input disabled placeholder="Giá thành được tính dựa trên tuyến đường" />
            </Form.Item>
            <Form.Item
                label="Thanh toán"
                name="payment_status"
                rules={[
                    {
                        required: true,
                        message: "Giá thành được tính dựa trên tuyến đường!",
                    },
                ]}
            >
                <Input disabled placeholder="Giá thành được tính dựa trên tuyến đường" />
            </Form.Item>
        </Form>
    )

    const updateFormList = (
        <Form
            form={formUpdate}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            onFinish={onUpdateSubmit}
            onValuesChange={onValuesChange}
            autoComplete="off"
        >
            <Form.Item
                label="ID"
                name="id"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                label="Tên khách hàng"
                name="customer_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn khách hàng!",
                    },
                ]}
            //todo: render
            >
                <SearchInput
                    loadFunction={loadOptionCustomerFunction}
                    labelInKeys={['id', "name"]}
                    placeholder="Vui lòng chọn khách hàng"
                />
            </Form.Item>
            <Form.Item
                label="Địa điểm nhận hàng"
                name="departure"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập địa điểm nhận hàng!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập địa điểm nhận hàng" />
            </Form.Item>
            <Form.Item
                label="Địa điểm trả hàng"
                name="arrival"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập địa điểm trả hàng!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập địa điểm trả hàng" />
            </Form.Item>
            <Form.Item
                label="Tuyến đường"
                name="cost_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn tuyến đường!",
                    },
                ]}
            //todo: render
            >
                <SearchInput
                    loadFunction={loadOptionCostFunction}
                    loadOptionsFirst={true}
                    labelInKeys={["id", "province", "arrival"]}
                    placeholder="Vui lòng chọn tuyến đường"
                />
            </Form.Item>
            <Form.Item
                label="Mặt hàng"
                name="material"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập mặt hàng!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập mặt hàng" />
            </Form.Item>
            <Form.Item
                label="Khối lượng (Tấn)"
                name="weight"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập khối lượng!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập khối lượng" />
            </Form.Item>
            <Form.Item
                label="Thời gian vận chuyển"
                name="deliver_time"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn thời gian vân chuyển!",
                    },
                ]}
            //todo: render
            >
                <RangePicker
                    format="DD/MM/YYYY"
                    placeholder={["Ngày nhận hàng", "Ngày trả hàng"]}
                    id={{ start: "start_date", end: "end_date" }}
                />
            </Form.Item>
            <Form.Item
                label="Loại xe"
                name="cat_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn loại xe!",
                    },
                ]}
            //todo: render
            >
                <SearchInput
                    loadFunction={loadOptionTruckCatFunction}
                    loadOptionsFirst={true}
                    labelInKeys={["id", "name"]}
                    placeholder="Vui lòng chọn loại xe"
                />
            </Form.Item>
            <Form.Item
                label="Xe tải"
                name="truck_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn xe tải!",
                    },
                ]}
            //todo: render
            >
                <SearchInput
                    loadFunction={loadOptionTruckFunction}
                    loadOptionsFirst={true}
                    labelInKeys={["id", "license_plate"]}
                    placeholder="Vui lòng chọn xe tải"
                />
            </Form.Item>
            <Form.Item
                label="Tài xế"
                name="driver_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn tài xế!",
                    },
                ]}
            >
                <SearchInput
                    loadFunction={loadOptionTruckFunction}
                    loadOptionsFirst={true}
                    labelInKeys={["id", "name"]}
                    placeholder="Vui lòng chọn tài xế"
                />
            </Form.Item>
            <Form.Item
                label="Chi phí"
                name="tolls"
                rules={[
                    {
                        required: true,
                        message: "Chi phí được tính dựa trên tuyến đường!",
                    },
                ]}
            >
                <Input disabled placeholder="Chi phí được tính dựa trên tuyến đường" />
            </Form.Item>
            <Form.Item
                label="Giá thành"
                name="pricing"
                rules={[
                    {
                        required: true,
                        message: "Giá thành được tính dựa trên tuyến đường!",
                    },
                ]}
            >
                <Input disabled placeholder="Giá thành được tính dựa trên tuyến đường" />
            </Form.Item>
        </Form>
    )
    return (
        <>
            <CreateModal
                name="đơn hàng"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
                {createFormList}
            </CreateModal>
            <UpdateModal
                name="đơn hàng"
                isModalVisible={isUpdateModalVisible}
                setIsModalVisible={setIsUpdateModalVisible}
                form={formUpdate}
            >
                {updateFormList}
            </UpdateModal>
            <LoadTable
                columns={columns}
                loadFunction={loadFunction}
                reload={reload}
            />
        </>
    )
}

export default Order;