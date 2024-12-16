import { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Flex, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CreateModal = ({ name, isModalVisible, setIsModalVisible, form, children }) => {

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleOk = () => {
        form.submit();
    };

    return (
        <Modal
            title={`Thêm mới ${name}`}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={`Thêm mới`}
            cancelText="Huỷ"
            centered
        >
            {children}
        </Modal>
    )
}

export default CreateModal;