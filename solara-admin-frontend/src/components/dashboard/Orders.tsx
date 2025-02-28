import { useState, useEffect, useCallback } from 'react';
import { Table, Card, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import { ReloadOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { orderApi, OrderDto } from "../../utils/axios/orderApi.ts";
import { IPageRequest } from "../../types/general.type.ts";
import { exportToCSV } from "../../utils/exportToCSV.ts"; // Import the exportToCSV utility

const { Search } = Input;
const { RangePicker } = DatePicker;

const OrderStatus = {
    All: 'All',
    Pending: 'Pending',
    Completed: 'Completed',
    Cancelled: 'Cancelled',
} as const;

export const Orders = () => {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [status, setStatus] = useState('All');
    const [searchKey, setSearchKey] = useState('');
    const [dateRange, setDateRange] = useState<[string, string] | undefined>();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const columns: ColumnsType<OrderDto> = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Order Code',
            dataIndex: 'orderCode',
            key: 'orderCode',
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Learning Package',
            dataIndex: 'learningPackageName',
            key: 'learningPackageName',
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
        },
        {
            title: 'Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
        },
        {
            title: 'Payment Date',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
            render: (date: string) => {
                const parsedDate = new Date(date);
                return isNaN(parsedDate.getTime())
                    ? 'Invalid Date'
                    : parsedDate.toLocaleDateString(); // Hiển thị theo định dạng mặc định của locale
            },
        },
        {
            title: 'Total Amount',
            dataIndex: 'total',
            key: 'total',
            align: 'right',
            render: (amount: number) => `${amount.toLocaleString()} VND`,
        },
    ];

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const params: IPageRequest = {
                page: pagination.current,
                size: pagination.pageSize,
                ...(searchKey && { search: searchKey }),
                ...(status !== 'All' && {  OrderStatus: status }),
                ...(dateRange && { startDate: dateRange[0], endDate: dateRange[1] }),
            };

            const response = await orderApi.getOrders(params);
            setOrders(response.responseRequest?.items || []); // API trả `items`
            setTotalCount(response.responseRequest?.total || 0); // API trả `total`
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    }, [pagination, searchKey, status, dateRange]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleTableChange = (newPagination: TablePaginationConfig) => {
        setPagination({
            current: newPagination.current || 1,
            pageSize: newPagination.pageSize || 10,
        });
    };

    const handleDateRangeChange = (_: unknown, dateStrings: [string, string]) => {
        setDateRange(dateStrings);
    };

    const handleExport = () => {
        exportToCSV(orders, 'orders.csv');
    };

    return (
        <Card
            title="Orders"
            extra={
                <>
                    <Button icon={<DownloadOutlined />} onClick={handleExport} style={{ marginRight: 8 }}>
                        Export
                    </Button>
                    <Button icon={<ReloadOutlined />} onClick={fetchOrders}>
                        Refresh
                    </Button>
                </>
            }
        >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={6}>
                    <Search
                        placeholder="Search orders"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        onSearch={() => fetchOrders()}
                    />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Select
                        style={{ width: '100%' }}
                        value={status}
                        onChange={setStatus}
                        options={Object.values(OrderStatus).map((value) => ({
                            label: value,
                            value: value,
                        }))}
                    />
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <RangePicker
                        style={{ width: '100%' }}
                        onChange={handleDateRangeChange}
                    />
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                pagination={{
                    ...pagination,
                    total: totalCount,
                    showSizeChanger: true,
                }}
                loading={loading}
                onChange={handleTableChange}
            />
        </Card>
    );
};

export default Orders;
