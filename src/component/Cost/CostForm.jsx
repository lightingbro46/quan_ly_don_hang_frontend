import { useState } from "react";
import { Form, Select, Input, InputNumber } from "antd";

const formItemLayout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
    style: {
        maxWidth: 600,
    }
}


const CostForm = ({ ...props }) => {
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            {...props}
        >

        </Form>
    )
}