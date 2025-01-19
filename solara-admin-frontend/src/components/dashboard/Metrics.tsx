import React from "react";
import Card from "./Card";

interface MetricsProps {
    metrics: {
        totalUsers: number;
        totalXP: number;
    };
}

const Metrics: React.FC<MetricsProps> = ({ metrics }) => {
    return (
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <Card title="Total Users" value={metrics.totalUsers} />
            <Card title="Total XP Earned" value={metrics.totalXP} />
        </div>
    );
};

export default Metrics;
