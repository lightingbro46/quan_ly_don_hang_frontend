import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Space, Table } from "antd";
import Highlighter from 'react-highlight-words';
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import qs from 'qs';

const LoadTable = ({ columns, loadFunction, reload }) => {
    // const [searchText, setSearchText] = useState('');
    // const [searchedColumn, setSearchedColumn] = useState('');
    // const searchInput = useRef(null);
    // const handleSearch = (selectedKeys, confirm, dataIndex) => {
    //     confirm();
    //     setSearchText(selectedKeys[0]);
    //     setSearchedColumn(dataIndex);
    // };
    // const handleReset = (clearFilters) => {
    //     clearFilters();
    //     setSearchText('');
    // };

    // const getColumnSearchProps = (dataIndex) => ({
    //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    //         <div
    //             style={{
    //                 padding: 8,
    //             }}
    //             onKeyDown={(e) => e.stopPropagation()}
    //         >
    //             <Input
    //                 ref={searchInput}
    //                 placeholder={`Search ${dataIndex}`}
    //                 value={selectedKeys[0]}
    //                 onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    //                 onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //                 style={{
    //                     marginBottom: 8,
    //                     display: 'block',
    //                 }}
    //             />
    //             <Space>
    //                 <Button
    //                     type="primary"
    //                     onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //                     icon={<SearchOutlined />}
    //                     size="small"
    //                     style={{
    //                         width: 90,
    //                     }}
    //                 >
    //                     Tìm kiếm
    //                 </Button>
    //                 {/* <Button
    //                     onClick={() => clearFilters && handleReset(clearFilters)}
    //                     size="small"
    //                     style={{
    //                         width: 90,
    //                     }}
    //                 >
    //                     Reset
    //                 </Button> */}
    //                 {/* <Button
    //                     type="link"
    //                     size="small"
    //                     onClick={() => {
    //                         confirm({
    //                             closeDropdown: false,
    //                         });
    //                         setSearchText(selectedKeys[0]);
    //                         setSearchedColumn(dataIndex);
    //                     }}
    //                 >
    //                     Filter
    //                 </Button> */}
    //                 <Button
    //                     type="link"
    //                     size="small"
    //                     onClick={() => {
    //                         close();
    //                     }}
    //                 >
    //                     Đóng
    //                     {/* <CloseOutlined /> */}
    //                 </Button>
    //             </Space>
    //         </div>
    //     ),
    //     filterIcon: (filtered) => (
    //         <SearchOutlined
    //             style={{
    //                 color: filtered ? '#1677ff' : undefined,
    //             }}
    //         />
    //     ),
    //     onFilter: (value, record) =>
    //         record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    //     filterDropdownProps: {
    //         onOpenChange(open) {
    //             if (open) {
    //                 setTimeout(() => searchInput.current?.select(), 100);
    //             }
    //         },
    //     },
    //     render: (text) =>
    //         searchedColumn === dataIndex ? (
    //             <Highlighter
    //                 highlightStyle={{
    //                     backgroundColor: '#ffc069',
    //                     padding: 0,
    //                 }}
    //                 searchWords={[searchText]}
    //                 autoEscape
    //                 textToHighlight={text ? text.toString() : ''}
    //             />
    //         ) : (
    //             text
    //         ),
    // });

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const getParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const fetchData = () => {
        setLoading(true);
        loadFunction(qs.stringify(getParams(tableParams)))
            .then(({ totalCount, results }) => {
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: totalCount,
                    },
                });
            })
    }

    useEffect(fetchData, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
        reload
    ]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    return (
        <Table
            columns={columns}
            rowKey={columns[0].dataIndex}
            pagination={tableParams.pagination}
            loading={loading}
            dataSource={data}
            onChange={handleTableChange}
            scroll={{
                x: 'max-content',
            }}
        />
    )
}

export default LoadTable;