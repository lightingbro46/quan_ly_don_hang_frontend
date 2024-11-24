import React, { useState, useEffect } from "react";
import { Modal, Form, Flex, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CreateModal = ({ object, isModalVisible, setIsModalVisible, form, children }) => {
    const showCreateModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleOk = () => {
        form.submit();
    };

    return (
        <>
            <Flex justify="flex-end" align="center">
                <Button
                    style={{
                        marginBottom: "16px",
                    }}
                    type="default"
                    onClick={() => showCreateModal()}
                >
                    <PlusOutlined /><span>Thêm mới</span>
                </Button>
            </Flex>
            <Modal
                title={`Thêm mới ${object}`}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={`Thêm mới`}
                cancelText="Huỷ"
                centered 
            >
                {children}
            </Modal>
        </>
    )
}

export default CreateModal;