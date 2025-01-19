import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    title: string;
    data: { label: string; value: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ title, data }) => {
    const chartData = {
        labels: data.map((d) => d.label),
        datasets: [
            {
                data: data.map((d) => d.value),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }
        ]
    };

    return (
        <div style={{ flex: 1 }}>
            <h3>{title}</h3>
            <Pie data={chartData} />
        </div>
    );
};

export default PieChart;
