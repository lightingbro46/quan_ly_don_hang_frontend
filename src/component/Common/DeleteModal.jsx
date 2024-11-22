import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const showDeleteConfirm = ({object, data, labelKeys, onDeleteSubmit}) => {
    confirm({
        title: `Bạn có muốn thực hiện xoá ${object}?`,
        icon: <ExclamationCircleFilled />,
        content: <>
            {labelKeys.map(val => {
                return  <p>{`${val["label"]}: ${data[val["key"]]}`}</p>
            })}
        </>,
        okText: 'Xoá',
        okType: 'danger',
        cancelText: 'Huỷ',
        onOk() {
            onDeleteSubmit(data[labelKeys[0]["key"]]);
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

export default showDeleteConfirm;