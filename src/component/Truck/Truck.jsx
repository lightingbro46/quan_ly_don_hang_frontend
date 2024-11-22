import React, { useEffect, useState } from "react";
import { Space, Badge, Flex, Button, Form, Input, Select, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";

const loadFunction = (query) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/api/trucks/list?${query}`)
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
        fetch(`http://localhost:3000/api/trucks/detail?id=${id}`)
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
        fetch(`http://localhost:3000/api/trucks/add`, {
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
        fetch(`http://localhost:3000/api/trucks/update?id=${id}`, {
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
        fetch(`http://localhost:3000/api/trucks/delete?id=${id}`)
            .then(res => {
                if (res.ok)
                    return resolve()
                else
                    throw new Error("Invalid response");
            })
            .catch(e => reject(e));
    })
}

const loadOptionTruckCatFunction = (query) => {
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

const Truck = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [initUpdateModalData, setInitUpdateModalData] = useState({});

    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const [formCreate] = Form.useForm();
    const [formUpdate] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';

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
        },
        {
            title: "Biển số xe",
            dataIndex: "licensePlate",
            key: "licensePlate",
            width: "15%",
        },
        {
            title: "Loại xe",
            dataIndex: "catId",
            key: "catId",
            render: (catId) => {
                let search = optionsTruckCat.filter(val => val.value == catId);
                return search.length > 0 ? search[0]['label'] : "";
            },
            width: "10%",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Space size="middle">
                    {(status == 1) && (
                        <>
                            <Badge dot status="success" />
                            <span>Đang hoạt động</span>
                        </>
                    )}
                    {(status == 2) && (
                        <>
                            <Badge dot status="error" />
                            <span>Bảo dưỡng, loại bỏ</span>
                        </>
                    )}
                </Space>
            ),
            width: "20%",
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
                        object: "xe tải",
                        data: record,
                        labelKeys: [{
                            label: "Mã xe tải",
                            key: "id"
                        }, {
                            label: "Biển số xe",
                            key: "licensePlate"
                        }],
                        onDeleteSubmit: onDeleteSubmit
                    })}>
                        <DeleteOutlined />
                    </a>
                </Space>
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

    useEffect(() => {
        loadOptionTruckCatFunction()
            .then(res => {
                setOptionsTruckCat(res.map(val => { return { value: val.id, label: val.name } }));
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

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
        </Form>
    );
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
                        { value: 1, label: "Bình thường" },
                        { value: 2, label: "Bảo dưỡng, loại bỏ" },
                    ]}
                    placeholder="Vui lòng chọn trạng thái"
                />
            </Form.Item>
        </Form>
    );

    return (
        <>
            {contextHolder}
            <CreateModal
                object="tài xế"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
                {createFormList}
            </CreateModal>
            <UpdateModal
                object="xe tải"
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

export default Truck;