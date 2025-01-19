import React from "react";
import { Table } from "antd"; // Using Ant Design for the table component
import { OrderDto } from "../../utils/axios/orderApi";

interface OrdersTableProps {
    orders: OrderDto[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
    const columns = [
        { title: "Order ID", dataIndex: "id", key: "id" },
        { title: "User ID", dataIndex: "userId", key: "userId" },
        { title: "Status", dataIndex: "orderStatus", key: "orderStatus" },
        { title: "Total (VND)", dataIndex: "total", key: "total" },
        { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" }
    ];

    return (
        <div style={{ marginTop: "30px" }}>
            <h2>Order List</h2>
            <Table columns={columns} dataSource={orders} rowKey="id" pagination={{ pageSize: 10 }} />
        </div>
    );
};

export default OrdersTable;
