import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    title: string;
    data: { label: string; value: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ title, data }) => {
    const chartData = {
        labels: data.map((d) => d.label),
        datasets: [
            {
                label: title,
                data: data.map((d) => d.value),
                backgroundColor: "rgba(75,192,192,0.4)"
            }
        ]
    };

    return (
        <div style={{ flex: 1 }}>
            <h3>{title}</h3>
            <Bar data={chartData} />
        </div>
    );
};

export default BarChart;
