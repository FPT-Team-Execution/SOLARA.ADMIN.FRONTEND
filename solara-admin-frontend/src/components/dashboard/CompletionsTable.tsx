import React from "react";
import { Table } from "antd"; // Using Ant Design for the table component
import { CompletionDto } from "../../utils/axios/completionApi";

interface CompletionsTableProps {
    completions: CompletionDto[];
}

const CompletionsTable: React.FC<CompletionsTableProps> = ({ completions }) => {
    const columns = [
        { title: "SubTopic Name", dataIndex: ["subTopic", "name"], key: "subTopic.name" },
        { title: "Description", dataIndex: ["subTopic", "description"], key: "subTopic.description" },
        { title: "Total XP", dataIndex: ["subTopic", "totalXP"], key: "subTopic.totalXP" },
        { title: "Earned XP", dataIndex: "earnedXP", key: "earnedXP" }
    ];

    return (
        <div style={{ marginTop: "30px" }}>
            <h2>Completion Reports</h2>
            <Table columns={columns} dataSource={completions} rowKey="id" pagination={{ pageSize: 10 }} />
        </div>
    );
};

export default CompletionsTable;
