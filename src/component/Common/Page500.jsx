import React from 'react';
import { Result, Button } from 'antd';

const Page500 = () => {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={
                <Button type="primary" href='/'>
                    Quay lại
                </Button>
            }
        />
    );
}

export default Page500;