import React, { useEffect, useState } from "react";
import { Space, Badge, Form, Input, Select, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";
import { apiSearch } from "../Common/Utils";

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

const loadOptionCustomerFunction = (query) => {
    return apiSearch({
        url: "http://localhost:3000/api/customers/list",
        queryParams
    })
}

const Order = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [initUpdateModalData, setInitUpdateModalData] = useState({});

    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const [formCreate] = Form.useForm();
    const [formUpdate] = Form.useForm();

    const [optionsTruckCat, setOptionsTruckCat] = useState([]);

    const showUpdateModal = (record) => {
        console.log(record)
        formUpdate.setFieldsValue(record);
        setInitUpdateModalData(record);
        setIsUpdateModalVisible(true);
    }

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
            dataIndex: "customerName",
            key: "customerName",
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
            width: "10%",
        },
        {
            title: "Thời gian nhận hàng",
            dataIndex: "startDate",
            key: "arrival",
            width: "10%",
        },
        {
            title: "Thời gian trả hàng",
            dataIndex: "endDate",
            key: "arrival",
            width: "10%",
        },
        {
            title: "Hàng hoá",
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
            dataIndex: "truckLicensePlate",
            key: "truckLicensePlate",
            width: "10%",
        },
        {
            title: "Tài xế",
            dataIndex: "driverName",
            key: "driverName",
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
            dataIndex: "cost",
            key: "cost",
            render: (value => `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value)}`),
            width: "10%",
        },
        {
            title: "Trạng thái vận chuyển",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Space size="middle">
                    {(status == 1) && (
                        <>
                            <Badge dot status="default" />
                            <span>Đã tiếp nhận</span>
                        </>
                    )}
                    {(status == 2) && (
                        <>
                            <Badge dot status="processing" />
                            <span>Đang vận chuyển</span>
                        </>
                    )}
                    {(status == 3) && (
                        <>
                            <Badge dot status="success" />
                            <span>Đã trả hàng</span>
                        </>
                    )}
                    {(status == 4) && (
                        <>
                            <Badge dot status="error" />
                            <span>Đã huỷ</span>
                        </>
                    )}
                </Space>
            ),
            width: "10%",
        },
        {
            title: "Trạng thái thanh toán",
            dataIndex: "payment",
            key: "payment",
            render: (status) => (
                <Space size="middle">
                    {(status == 1) && (
                        <>
                            <Badge dot status="processing" />
                            <span>Chưa thanh toán</span>
                        </>
                    )}
                    {(status == 2) && (
                        <>
                            <Badge dot status="success" />
                            <span>Đã thanh toán</span>
                        </>
                    )}
                </Space>
            ),
            width: "10%",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showUpdateModal(record)}>
                        <EditOutlined />
                    </a>
                    <a onClick={() => showDeleteConfirm({
                        object: "đơn hàng",
                        data: record,
                        labelKeys: [{
                            label: "Mã đơn hàng",
                            key: "id"
                        }],
                        onDeleteSubmit: onDeleteSubmit
                    })}>
                        <DeleteOutlined />
                    </a>
                </Space >
            ),
            width: "10%",
            fixed: 'right',
        },
    ]

    const onCreateSubmit = (values) => {
        console.log("Success:", values);
        message.loading(`Thêm mới...`);
        createFunction(values)
            .then((res) => {
                message.success(`Thêm mới thành công!`);
                setIsCreateModalVisible(false);
                formCreate.resetFields();
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                message.error(`Thêm mới thất bại`);
            })
    };

    const onUpdateSubmit = (values) => {
        console.log("Success:", values);
        message.loading(`Cập nhật...`);
        updateFunction(values)
            .then((res) => {
                message.success(`Cập nhật thành công!`);
                formUpdate.resetFields();
                setIsUpdateModalVisible(false);
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                message.error(`Cập nhật thất bại`);
            })
    };

    const onDeleteSubmit = (id) => {
        console.log("Success:", id);
        message.loading(`Xoá...`);
        deleteFunction(id)
            .then((res) => {
                message.success(`Xoá thành công!`);
                setIsDeleteModalVisible(false);
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                message.error(`Xoá thất bại`);
            })
    };

    // useEffect(() => {
    //     loadOptionTruckCatFunction()
    //         .then(res => {
    //             setOptionsTruckCat(res.map(val => { return { value: val.id, label: val.name } }));
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         })
    //     loadOptionCostFunction()
    //         .then(res => {
    //             setOptionsCost(res.map(val => { return { value: val.id, label: val.name } }));
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         })
    // }, []);

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
            autoComplete="off"
        >
            <Form.Item
                label="Khách hàng"
                name="customer"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn khách hàng!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Loại xe"
                name="catId"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn loại xe!",
                    },
                ]}
            >
                <Select
                    options={optionsTruckCat}
                    placeholder="Vui lòng chọn loại xe"
                />
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
            autoComplete="off"
        >
            <Form.Item
                label="Mã xe tải"
                name="id"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input disabled={true} />
            </Form.Item>
            <Form.Item
                label="Biển số xe"
                name="licensePlate"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập biển số xe!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Loại xe"
                name="catId"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn loại xe!",
                    },
                ]}
            >
                <Select
                    options={optionsTruckCat}
                    placeholder="Vui lòng chọn loại xe"
                />
            </Form.Item>
            <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn trạng thái!",
                    },
                ]}
            >
                <Select
                    options={[
                        { value: 1, label: "Đang làm việc" },
                        { value: 2, label: "Bảo dưỡng, loại bỏ" },
                    ]}
                    placeholder="Vui lòng chọn trạng thái"
                />
            </Form.Item>
        </Form>
    )
    return (
        <>
            <CreateModal
                object="đơn hàng"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
                {createFormList}
            </CreateModal>
            <UpdateModal
                object="đơn hàng"
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