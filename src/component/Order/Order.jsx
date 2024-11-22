import React, { useEffect, useState } from "react";
import { Space, Badge, Flex, Button, Form, Input, Select, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";

const loadFunction = (query) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/api/orders/list?${query}`)
            .then(res => {
                if (res.ok)
                    return res.json();
                else throw new Error("Invalid response");
            })
            .then(res => resolve(res))
            .catch(e => reject(e));
    })
}

const getFunction = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/api/orders/detail?id=${id}`)
            .then(res => {
                if (res.ok)
                    return res.json();
                else throw new Error("Invalid response");
            })
            .then(res => resolve(res))
            .catch(e => reject(e));
    })
}

const createFunction = (values) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/api/orders/add`, {
            method: "POST",
            body: JSON.stringify(values)
        })
            .then(res => {
                if (res.ok)
                    return res.json();
                else throw new Error("Invalid response");
            })
            .then(res => resolve(res))
            .catch(e => reject(e));
    })
}

const updateFunction = (values) => {
    return new Promise((resolve, reject) => {
        const id = values.id;
        fetch(`http://localhost:3000/api/orders/update?id=${id}`, {
            method: "POST",
            body: JSON.stringify(values)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Invalid response")
                }

            })
            .then(res => resolve(res))
            .catch(e => reject(e));
    })
}

const deleteFunction = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/api/orders/delete?id=${id}`)
            .then(res => {
                if (res.ok)
                    return resolve()
                else
                    throw new Error("Invalid response");
            })
            .catch(e => reject(e));
    })
}

const loadOptionFunction = (query) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/api/truck_cats/list?${query}`)
            .then(res => {
                if (res.ok)
                    return res.json();
                else throw new Error("Invalid response");
            })
            .then(res => resolve(res))
            .catch(e => reject(e));
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
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';

    const [options, setOptions] = useState([]);

    const showCreateModal = () => {
        setIsCreateModalVisible(true);
    }
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
        },
        {
            title: "Mã khách hàng",
            dataIndex: "customer",
            key: "customer",
            width: "10%",
        },
        {
            title: "Điểm nhận hàng",
            dataIndex: "departure",
            key: "departure",
            width: "15%",
        },
        {
            title: "Thời gian nhận hàng",
            dataIndex: "startDate",
            key: "arrival",
            width: "10%",
        },
        {
            title: "Điểm trả hàng",
            dataIndex: "arrival",
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
            title: "Mã xe tải",
            dataIndex: "truck",
            key: "truck",
            width: "10%",
        },
        {
            title: "Mã tài xế",
            dataIndex: "driver",
            key: "driver",
            width: "10%",
        },
        {
            title: "Giá thành",
            dataIndex: "pricing",
            key: "pricing",
            width: "10%",
        },
        {
            title: "Chi phí",
            dataIndex: "cost",
            key: "cost",
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
                            <Badge dot color="yellow" />
                            <span>Đã tiếp nhận</span>
                        </>
                    )}
                    {(status == 2) && (
                        <>
                            <Badge dot color="green" />
                            <span>Đang vận chuyển</span>
                        </>
                    )}
                    {(status == 3) && (
                        <>
                            <Badge dot color="green" />
                            <span>Đã trả hàng</span>
                        </>
                    )}
                    {(status == 4) && (
                        <>
                            <Badge dot color="red" />
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
                    <Badge dot color={status == 1 ? "red" : "green"} />
                    <span>{status == 1 ? "Chưa thanh toán" : "Đã thanh toán"}</span>
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
        },
    ]

    const onCreateSubmit = (values) => {
        console.log("Success:", values);
        messageApi.open({
            key,
            type: 'loading',
            content: `Thêm mới...`,
        });
        createFunction(values)
            .then((res) => {
                messageApi.open({
                    key,
                    type: 'success',
                    content: `Thêm mới thành công!`,
                });
                setIsCreateModalVisible(false);
                formCreate.resetFields();
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                messageApi.open({
                    key,
                    type: 'error',
                    content: `Thêm mới thất bại`,
                });
            })
    };

    const onUpdateSubmit = (values) => {
        console.log("Success:", values);
        messageApi.open({
            key,
            type: 'loading',
            content: `Cập nhật...`,
        });
        updateFunction(values)
            .then((res) => {
                messageApi.open({
                    key,
                    type: 'success',
                    content: `Cập nhật thành công!`,
                });
                formUpdate.resetFields();
                setIsUpdateModalVisible(false);
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                messageApi.open({
                    key,
                    type: 'error',
                    content: `Cập nhật thất bại`,
                });
            })
    };

    const onDeleteSubmit = (id) => {
        console.log("Success:", id);
        messageApi.open({
            key,
            type: 'loading',
            content: `Xoá...`,
        });
        deleteFunction(id)
            .then((res) => {
                messageApi.open({
                    key,
                    type: 'success',
                    content: `Xoá thành công!`,
                });
                setIsDeleteModalVisible(false);
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                messageApi.open({
                    key,
                    type: 'error',
                    content: `Xoá thất bại`,
                });
            })
    };

    const fetchData = () => {
        return new Promise((resolve, reject) => {
            loadOptionFunction()
                .then((res) => {
                    setOptions(res.map(val => { return { value: val.id, label: val.name } }));
                    resolve(loadFunction());
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    return (
        <>
            {contextHolder}
            <Flex justify="flex-end" align="center">
                <Button
                    style={{
                        marginBottom: "16px",
                    }}
                    type="default"
                    onClick={() => showCreateModal()}
                >
                    <PlusOutlined />
                </Button>
            </Flex>
            <CreateModal
                object="đơn hàng"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
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
                            options={options}
                            placeholder="Vui lòng chọn loại xe"
                        />
                    </Form.Item>
                </Form>
            </CreateModal>
            <UpdateModal
                object="xe tải"
                isModalVisible={isUpdateModalVisible}
                setIsModalVisible={setIsUpdateModalVisible}
                form={formUpdate}
            >
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
                            options={options}
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
            </UpdateModal>
            <LoadTable
                columns={columns}
                loadFunction={fetchData}
                reload={reload}
            />
        </>
    )
}

export default Order;