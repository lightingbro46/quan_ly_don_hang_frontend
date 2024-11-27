import { useState, useEffect } from "react";
import { Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const showDeleteConfirm = ({ object, data, labelInKeys, onDeleteSubmit }) => {
    confirm({
        title: `Bạn có muốn thực hiện xoá ${object}?`,
        icon: <ExclamationCircleFilled />,
        content: <>
            {labelInKeys.map((val, idx) => <p key={idx}>{`${val["label"]}: ${data[val["key"]]}`}</p>)}
        </>,
        okText: 'Xoá',
        okType: 'danger',
        cancelText: 'Huỷ',
        onOk() {
            onDeleteSubmit(data[labelInKeys[0]["key"]]);
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

export default showDeleteConfirm;