import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { UserDto} from "../../types/user";
import { CompletionDto } from "../../utils/axios/completionApi";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartsProps {
    users: UserDto[];
    completions: CompletionDto[];
}

const Charts: React.FC<ChartsProps> = ({ users, completions }) => {
    /** DỮ LIỆU CHO USERS **/
    const registrationsByDate = users.reduce((acc, user) => {
        const createdOn = user.createdOn ? new Date(user.createdOn).toLocaleDateString() : "Unknown Date";
        acc[createdOn] = (acc[createdOn] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const userBarChartData = {
        labels: Object.keys(registrationsByDate),
        datasets: [
            {
                label: "Số lượng người dùng",
                data: Object.values(registrationsByDate),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const roleDistribution = users.reduce((acc, user) => {
        const role = user.roleName || "Unknown";
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const rolePieChartData = {
        labels: Object.keys(roleDistribution),
        datasets: [
            {
                data: Object.values(roleDistribution),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const emailVerification = users.reduce(
        (acc, user) => {
            if (user.emailConfirm) {
                acc.verified++;
            } else {
                acc.unverified++;
            }
            return acc;
        },
        { verified: 0, unverified: 0 }
    );

    const emailVerificationPieChartData = {
        labels: ["Đã xác thực", "Chưa xác thực"],
        datasets: [
            {
                data: [emailVerification.verified, emailVerification.unverified],
                backgroundColor: ["#4CAF50", "#FF5722"],
                hoverBackgroundColor: ["#4CAF50", "#FF5722"],
            },
        ],
    };

    /** DỮ LIỆU CHO COMPLETION **/
    const xpByDate = completions.reduce((acc, completion) => {
        const createdOn = completion.subTopic.createdOn
            ? new Date(completion.subTopic.createdOn).toLocaleDateString()
            : "Unknown Date";
        acc[createdOn] = (acc[createdOn] || 0) + completion.earnedXP;
        return acc;
    }, {} as Record<string, number>);

    const xpLineChartData = {
        labels: Object.keys(xpByDate),
        datasets: [
            {
                label: "Tổng XP kiếm được",
                data: Object.values(xpByDate),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
            },
        ],
    };

    const xpBySubTopic = completions.reduce((acc, completion) => {
        const subTopicName = completion.subTopic.name || "Unknown SubTopic";
        acc[subTopicName] = (acc[subTopicName] || 0) + completion.earnedXP;
        return acc;
    }, {} as Record<string, number>);

    const xpBarChartData = {
        labels: Object.keys(xpBySubTopic),
        datasets: [
            {
                label: "XP kiếm được",
                data: Object.values(xpBySubTopic),
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 1,
            },
        ],
    };

    const completionBySubTopic = completions.reduce((acc, completion) => {
        const subTopicName = completion.subTopic.name || "Unknown SubTopic";
        acc[subTopicName] = (acc[subTopicName] || 0) + completion.count;
        return acc;
    }, {} as Record<string, number>);

    const completionPieChartData = {
        labels: Object.keys(completionBySubTopic),
        datasets: [
            {
                data: Object.values(completionBySubTopic),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
        ],
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "20px" }}>
                <div>
                    <h4>Người dùng đăng ký theo ngày</h4>
                    <Bar data={userBarChartData} />
                </div>
                <div>
                    <h4>Phân bổ vai trò người dùng</h4>
                    <Pie data={rolePieChartData} />
                </div>
                <div>
                    <h4>Xác thực email</h4>
                    <Pie data={emailVerificationPieChartData} />
                </div>
                <div>
                    <h4>Tổng XP kiếm được theo thời gian</h4>
                    <Line data={xpLineChartData} />
                </div>
                <div>
                    <h4>XP kiếm được theo SubTopic</h4>
                    <Bar data={xpBarChartData} />
                </div>
                <div>
                    <h4>Số lần hoàn thành bài tập theo SubTopic</h4>
                    <Pie data={completionPieChartData} />
                </div>
            </div>
        </div>
    );
};

export default Charts;
