import { useState, useEffect } from 'react';
import { Table, Card, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

interface Order {
    id: string;
    userId: string;
    status: string;
    createdAt: string;
    totalAmount: number;
}

interface OrdersResponse {
    items: Order[];
    totalCount: number;
    pageSize: number;
    currentPage: number;
}

const { Search } = Input;
const { RangePicker } = DatePicker;

const OrderStatus = {
    All: 'All',
    Pending: 'Pending',
    Completed: 'Completed',
    Cancelled: 'Cancelled',
};

export const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [status, setStatus] = useState('All');
    const [beginDate, setBeginDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [searchKey, setSearchKey] = useState('');
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const columns: ColumnsType<Order> = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            align: 'right',
            render: (amount: number) => `$${amount.toFixed(2)}`,
        },
    ];

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                Page: pagination.current.toString(),
                Size: pagination.pageSize.toString(),
                ...(status !== 'All' && { OrderStatus: status }),
                ...(beginDate && { BeginDate: beginDate }),
                ...(endDate && { EndDate: endDate }),
                ...(searchKey && { SearchKey: searchKey }),
            });

            const response = await axios.get<OrdersResponse>(
                `http://localhost:5055/api/orders?${params.toString()}`
            );

            setOrders(response.data.items);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [pagination.current, pagination.pageSize, status, beginDate, endDate, searchKey]);

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const handleDateRangeChange = (_: any, dateStrings: [string, string]) => {
        setBeginDate(dateStrings[0]);
        setEndDate(dateStrings[1]);
    };

    return (
        <Card
            title="Orders"
            extra={
                <Button icon={<ReloadOutlined />} onClick={fetchOrders}>
                    Refresh
                </Button>
            }
        >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={6}>
                    <Search
                        placeholder="Search orders"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Select
                        style={{ width: '100%' }}
                        value={status}
                        onChange={setStatus}
                        options={Object.entries(OrderStatus).map(([key, value]) => ({
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
                    showTotal: (total) => `Total ${total} items`,
                }}
                loading={loading}
                onChange={handleTableChange}
            />
        </Card>
    );
};

export default Orders;
