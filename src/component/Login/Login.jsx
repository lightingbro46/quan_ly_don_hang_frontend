import { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, message, Flex, Image } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { apiSearch } from "../Common/Utils";
import logo from "../../assets/images/react.svg"
const { Title } = Typography;

const loginFunction = (values) => {
    return apiSearch({
        url: "http://localhost:3000/api/users/login",
        method: "POST",
        bodyParams: values
    })
}
const getFunction = (queryParams) => {
    return apiSearch({
        url: "http://localhost:3000/api/users/detail",
        queryParams
    })
}
const LoginPage = ({ setProfile }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        console.log('Login values:', values);
        loginFunction(values)
            .then(res => {
                message.success('Đăng nhập thành công!');
                setProfile(res);
            })
            .catch(e => {
                message.error('Đăng nhập thất bại. Vui lòng kiểm tra thông tin tài khoản.');
            })
    };

    return (
        <Flex
            style={{
                minWidth: '100vw',
                minHeight: '100vh',
                backgroundColor: '#f0f2f5',
            }}
            justify="center"
            align="center"
        >

            <Flex
                vertical
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Flex justify="center">
                    <Image src={logo} alt="logo image" width={80} preview={false} />
                </Flex>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
                    Đăng nhập
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    name="loginForm"
                    onFinish={handleSubmit}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="username"
                        label="Tài khoản"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tài khoản!' },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="tài khoản" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Vui lòng nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Ghi nhớ tài khoản</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </Flex>
    );
}

export default LoginPage;