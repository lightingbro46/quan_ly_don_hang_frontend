import React, { useState, useEffect } from "react";
import { Modal, Space } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

export const showDeleteConfirm = (object, data, keys) => {
    confirm({
        title: `Bạn muốn thực hiện xoá ${object}?`,
        icon: <ExclamationCircleFilled />,
        content: <Space wrap>
            {keys.map(val => {
                return 
            })}
            {(keyId && data[keyId]) && <p>{`Mã ${object}: ${data[keyId]}`}</p>}
            {(keyName && data[keyName]) && <p>{`Tên ${object}: ${data[keyName]}`}</p>}
        </Space>,
        okText: 'Xoá',
        okType: 'danger',
        cancelText: 'Huỷ',
        onOk() {
            onDeleteSubmit(data[keyId]);
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

const DeleteModal = ({ object, data, keyId, keyName, isModalVisible, setIsModalVisible, onDeleteSubmit }) => {
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        onDeleteSubmit(data[keyId]);
    };

    return (
        <Modal
            title={`Xoá ${object} `}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Xoá"
            cancelText="Huỷ"
        >
            <div style={{
                padding: "0 32px"
            }}>
                {data[keyId] && (<p>{`Mã ${object}: ${data[keyId]}`}</p>)}
                {data[keyName] && (<p>{`Tên ${object}: ${data[keyName]}`}</p>)}
            </div>

        </Modal>
    )
}

export default DeleteModal;