import { useRef, useState } from "react";
import { DatePicker, Select, Space, Typography, Button, Form, Table, Flex } from "antd";
import { ExportOutlined, PrinterOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(quarterOfYear);
import 'dayjs/locale/vi';
dayjs.locale('vi');

import { Chart as ChartJS, BarController, LineController, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
ChartJS.register(BarController, LineController, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

import { apiSearch, handleActionCallback } from "../Common/Utils";
import PDFViewer from "../Common/PDFViewer";
import { editReport, reportTempUrl } from "./Report";

const { RangePicker } = DatePicker;

const loadDataFunction = (queryParams) => {
    return apiSearch({
        url: `http://localhost:3000/api/report/revenue`,
        queryParams
    });
}

const getMonthsUntilDate = (date) => {
    const selectedDate = dayjs(date); // Ngày được chọn
    const startOfYear = selectedDate.startOf('year'); // Ngày đầu tiên của năm
    const months = [];

    for (let i = 0; i <= selectedDate.month(); i++) {
        months.push({
            month: startOfYear.add(i, 'month').format('MMM'),
            start_date: startOfYear.add(i, 'month').startOf("month").format('YYYY-MM-DD'),
            end_date: startOfYear.add(i, 'month').endOf("month").format('YYYY-MM-DD'),
        }); // Thêm tháng vào danh sách
    }

    return months;
}

const dataComboChartTemplate = (data) => ({
    labels: data.map(val => val.label),
    datasets: [
        {
            type: 'bar',
            label: 'Doanh thu',
            data: data.map(val => val.revenue),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            yAxisID: 'y',
            borderWidth: 1,
        },
        {
            type: 'bar',
            label: 'Giá vốn',
            data: data.map(val => val.cost),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            yAxisID: 'y',
            borderWidth: 1,
        },
        {
            type: 'line',
            label: 'Lợi nhuận sau thuế',
            data: data.map(val => val.profitsAfterTax),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 1)',
            tension: 0.4,
            yAxisID: 'y'
        },
    ]
});

const optionsComboChart = (year) => ({
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Biểu đồ doanh thu, chi phí và lợi nhuận sau thuế qua các tháng năm ' + year,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Đồng',
            }
        },
        x: {
            title: {
                display: true,
                text: 'Tháng'
            }
        }
    }
});

const Revenue = () => {
    const [form] = Form.useForm();
    const [isExported, setIsExported] = useState(false);
    const [period, setPeriod] = useState(1);
    const [year, setYear] = useState();
    const periodText = useRef("");
    const [data, setData] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);
    const [inputModalData, setInputModalData] = useState({});

    const onFormChange = (value) => {
        console.log("onFormChange", value);
        setIsExported(false);
        setDataChart([]);
        setInputModalData({});
        if (value.period) {
            form.resetFields(["month", "quarter", "year", "range"])
            setPeriod(value.period);
        }
    }

    const onSubmit = (values) => {
        console.log("onSubmit", values);
        let queryParams = {
            period: values.period
        }

        switch (values.period) {
            case 1:
                queryParams.start_date = dayjs(values.month).startOf("month").format('YYYY-MM-DD');
                queryParams.end_date = dayjs(values.month).endOf("month").format('YYYY-MM-DD');
                setYear(dayjs(values.month).format("YYYY"));
                periodText.current = `Tháng ${dayjs(values.month).format("MM")} Năm ${dayjs(values.month).format("YYYY")}`;
                break;
            case 2:
                queryParams.start_date = dayjs(values.quarter).startOf("quarter").format('YYYY-MM-DD');
                queryParams.end_date = dayjs(values.quarter).endOf("quarter").format('YYYY-MM-DD');
                setYear(dayjs(values.quarter).format("YYYY"));
                periodText.current = `Quý ${dayjs(values.quarter).quarter()} Năm ${dayjs(values.month).format("YYYY")}`;
                break;
            case 3:
                queryParams.start_date = dayjs(values.year).startOf("year").format('YYYY-MM-DD');
                queryParams.end_date = dayjs(values.year).endOf("year").format('YYYY-MM-DD');
                setYear(dayjs(values.year).format("YYYY"));
                periodText.current = `Năm ${dayjs(values.year).format("YYYY")}`;
                break;
            case 4:
                queryParams.start_date = dayjs(values.range[0]).format('YYYY-MM-DD');
                queryParams.end_date = dayjs(values.range[1]).format('YYYY-MM-DD');
                setYear(dayjs(values.range[1]).format("YYYY"));
                periodText.current = `Từ ngày ${dayjs(values.range[0]).format("DD-MM-YYYY")} đến ngày ${dayjs(values.range[1]).format("DD-MM-YYYY")}`;
                break;
        }

        let p = [];
        p.push(new Promise((resolve, reject) => {
            handleActionCallback(loadDataFunction, queryParams)
                .then(res => {
                    setData(res.report);
                    setInputModalData({
                        ...res.data,
                        periodText: periodText.current
                    })
                })
                .catch(e => setData([]))
                .finally(resolve);
        }))

        let months = getMonthsUntilDate(queryParams.end_date);

        months.forEach((val, idx) => {
            p.push(new Promise((resolve, reject) => {
                let query = {
                    period: 1,
                    start_date: val.start_date,
                    end_date: val.end_date,
                }
                handleActionCallback(loadDataFunction, query)
                    .then(res => {
                        let item = {
                            label: val.month,
                            revenue: res.data.revenue,
                            cost: res.data.cost,
                            profitsAfterTax: res.data.profitsAfterTax,
                        }
                        console.log(item);
                        setDataChart(pre => {
                            pre[idx] = item;
                            return pre;
                        })
                    })
                    .catch(e => {
                        console.log(e);
                        setDataChart(pre => {
                            pre[idx] = {};
                            return pre;
                        })
                    })
                    .finally(resolve);
            }))
        })

        Promise.all(p)
            .then(() => {
                setIsExported(true);
            })
    }

    const showReportModal = () => {
        setIsReportModalVisible(true);
    }

    const columns = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            width: "10%",
        },
        {
            title: "Chỉ tiêu",
            dataIndex: "key",
            key: "key",
            width: "60%",
        },
        {
            title: "Số tiền",
            dataIndex: "value",
            key: "value",
            width: "30%",
            render: (value => `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value)}`),
            align: "center"
        }
    ]

    return (
        <>
            <Typography.Title level={4} style={{ marginBlockStart: 0 }} >Báo cáo doanh thu, chi phí</Typography.Title>
            <Form
                form={form}
                layout="horizontal"
                initialValues={{
                    period: 1,
                }}
                onValuesChange={onFormChange}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 8,
                }}
                style={{
                    marginBlock: "16px",
                    maxWidth: 600
                }}
                onFinish={onSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Chu kỳ"
                    name="period"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn chu kỳ!",
                        },
                    ]}
                >
                    <Select
                        options={[
                            { value: 1, label: "Theo tháng" },
                            { value: 2, label: "Theo quý" },
                            { value: 3, label: "Theo năm" },
                            { value: 4, label: "Tuỳ chọn" },
                        ]}
                        placeholder="Vui lòng chọn chu kỳ"
                    />
                </Form.Item>
                <Form.Item
                    label="Tháng"
                    name="month"
                    rules={[
                        {
                            required: period == 1,
                            message: "Vui lòng chọn tháng!",
                        },
                    ]}
                    hidden={period != 1}
                >
                    <DatePicker
                        picker="month"
                        format="MM/YYYY"
                        placeholder={"Vui lòng chọn tháng"}
                    />
                </Form.Item>
                <Form.Item
                    label="Quý"
                    name="quarter"
                    rules={[
                        {
                            required: period == 2,
                            message: "Vui lòng chọn quý!",
                        },
                    ]}
                    hidden={period != 2}
                >
                    <DatePicker
                        picker="quarter"
                        placeholder={"Vui lòng chọn quý"}
                    />
                </Form.Item>
                <Form.Item
                    label="Năm"
                    name="year"
                    rules={[
                        {
                            required: period == 3,
                            message: "Vui lòng chọn năm!",
                        },
                    ]}
                    hidden={period != 3}
                >
                    <DatePicker
                        picker="year"
                        format="YYYY"
                        placeholder={"Vui lòng chọn năm"}
                    />
                </Form.Item>
                <Form.Item
                    label="Thời gian"
                    name="range"
                    rules={[
                        {
                            required: period == 4,
                            message: "Vui lòng chọn thời gian!",
                        },
                    ]}
                    hidden={period != 4}
                >
                    <RangePicker
                        format="DD/MM/YYYY"
                        placeholder={["Từ ngày", "Đến ngày"]}
                        id={{ start: "start_date", end: "end_date" }}
                    />
                </Form.Item>
                <Form.Item
                    label={null}
                    name=""
                >
                    <Space size={"small"} style={{ height: "32px" }} direction="horizontal">
                        <Form.Item label={null} >
                            <Button type="primary" htmlType="submit" icon={<ExportOutlined />}>Xuất báo cáo</Button>
                        </Form.Item>
                        <Form.Item label={null} hidden={!isExported} onClick={showReportModal}>
                            <Button type="primary" icon={<PrinterOutlined />}>In báo cáo</Button>
                        </Form.Item>
                    </Space>
                </Form.Item>
            </Form>
            {(isExported) && (
                <Flex gap="middle" vertical={false}>
                    <Flex flex={1} style={{ marginBlockStart: "64px" }}>
                        <Table
                            size="small"
                            style={{
                                width: 600
                            }}
                            columns={columns}
                            rowKey={"id"}
                            dataSource={data}
                            pagination={false}
                            bordered
                        />
                    </Flex>
                    <Flex flex={1}>
                        <Chart type="bar" data={dataComboChartTemplate(dataChart)} options={optionsComboChart(year)} />;
                    </Flex>
                </Flex>
            )}
            <PDFViewer
                isModalVisible={isReportModalVisible}
                setIsModalVisible={setIsReportModalVisible}
                pdfTempUrl={reportTempUrl}
                editPdfDoc={(params) => editReport({ record: inputModalData, ...params })}
            />
        </>
    )
}

export default Revenue;