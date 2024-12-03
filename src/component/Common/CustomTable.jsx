import { useState, useEffect } from "react";
import { Table, message } from "antd";
import useSWR from "swr";
import Page500 from "../Common/Page500";

const getTableParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

const CustomTable = ({
    columnsTable,
    getDataForTableFunc,
    handlePreProcess,
}) => {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });
    };

    const { data, error, isLoading, isValidating } = useSWR(getTableParams(tableParams), getDataForTableFunc);

    if (error) return <Page500 />;

    return (
        <Table
            columns={columnsTable}
            rowKey="id"
            pagination={{
                ...tableParams.pagination,
                total: data?.totalCount || 0
            }}
            loading={isValidating}
            dataSource={handlePreProcess ? handlePreProcess(data) : data}
            onChange={handleTableChange}
            scroll={{
                x: 'max-content',
            }}
            bordered
        />
    )
}

export default CustomTable;