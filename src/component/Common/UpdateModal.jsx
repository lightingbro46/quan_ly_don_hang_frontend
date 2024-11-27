import React from "react";

import { Modal } from "antd";

const UpdateModal = ({ name, isModalVisible, setIsModalVisible, form, children }) => {
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleOk = () => {
        form.submit();
    };

    return (
        <Modal
            title={`Cập nhật thông tin ${name}`}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={`Cập nhật`}
            cancelText="Huỷ"
            centered 
        >
            {children}
        </Modal>
    )
}

export default UpdateModal;