import React from "react";
import { Table } from "antd"; // Using Ant Design for the table component
import { UserDto} from "../../types/user";

interface UsersTableProps {
    users: UserDto[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
    const columns = [
        { title: "User ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "fullName", key: "fullName" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Created Date", dataIndex: "createdOn", key: "createdOn" }
    ];

    return (
        <div style={{ marginTop: "30px" }}>
            <h2>User List</h2>
            <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 10 }} />
        </div>
    );
};

export default UsersTable;
