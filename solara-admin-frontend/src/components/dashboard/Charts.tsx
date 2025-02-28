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
import { UserDto } from "../../types/user";
import { CompletionDto } from "../../utils/axios/completionApi";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  users: UserDto[];
  completions: CompletionDto[];
}

// Component tái sử dụng cho các card chứa biểu đồ
interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  heightClass?: string;
}
const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  heightClass = "",
}) => (
  <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
      {title}
    </h3>
    <div className={heightClass}>{children}</div>
  </div>
);

// Component tái sử dụng cho các card tóm tắt
interface SummaryCardProps {
  title: string;
  value: number | string;
  bgColor: string;
}
const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, bgColor }) => (
  <div className={`${bgColor} text-white p-4 rounded-lg shadow-md`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const Charts: React.FC<ChartsProps> = ({ users, completions }) => {
  /*** DỮ LIỆU CHO BIỂU ĐỒ NGƯỜI DÙNG ***/
  const registrationsByDate = users.reduce((acc, user) => {
    const createdOn = user.createdOn
      ? new Date(user.createdOn).toLocaleDateString()
      : "Unknown Date";
    acc[createdOn] = (acc[createdOn] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const userBarChartData = {
    labels: Object.keys(registrationsByDate),
    datasets: [
      {
        label: "Số lượng người dùng",
        data: Object.values(registrationsByDate),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        borderRadius: 6,
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
        backgroundColor: ["#4361EE", "#3A0CA3", "#7209B7", "#F72585"],
        hoverBackgroundColor: ["#4361EE", "#3A0CA3", "#7209B7", "#F72585"],
        borderWidth: 1,
        borderColor: "#fff",
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
        backgroundColor: ["#10B981", "#F43F5E"],
        hoverBackgroundColor: ["#059669", "#E11D48"],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  /*** DỮ LIỆU CHO BIỂU ĐỒ HOÀN THÀNH ***/
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
        borderColor: "#0EA5E9",
        backgroundColor: "rgba(14, 165, 233, 0.2)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: "#0EA5E9",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
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
        backgroundColor: "rgba(249, 115, 22, 0.7)",
        borderColor: "rgba(249, 115, 22, 1)",
        borderWidth: 1,
        borderRadius: 6,
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
        label: "Số lượt hoàn thành",
        data: Object.values(completionBySubTopic),
        backgroundColor: [
          "#8B5CF6",
          "#EC4899",
          "#F59E0B",
          "#10B981",
          "#6366F1",
        ],
        hoverBackgroundColor: [
          "#7C3AED",
          "#DB2777",
          "#D97706",
          "#059669",
          "#4F46E5",
        ],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  // Cấu hình options dùng chung cho tất cả biểu đồ
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleFont: { size: 14, weight: 700 },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 8,
        boxPadding: 6,
      },
    },
  };

  // Cấu hình riêng cho biểu đồ dạng Bar
  const barOptions = {
    ...chartOptions,
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(156, 163, 175, 0.1)" },
      },
    },
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Dashboard Thống Kê
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Biểu đồ người dùng */}
        <ChartCard title="Người dùng đăng ký theo ngày">
          <Bar data={userBarChartData} options={barOptions} />
        </ChartCard>

        <ChartCard title="Phân bổ vai trò người dùng" heightClass="h-64">
          <Pie data={rolePieChartData} options={chartOptions} />
        </ChartCard>

        <ChartCard title="Tình trạng xác thực email" heightClass="h-64">
          <Pie data={emailVerificationPieChartData} options={chartOptions} />
        </ChartCard>

        {/* Biểu đồ hoàn thành */}
        <ChartCard title="Tổng XP kiếm được theo thời gian">
          <Line data={xpLineChartData} options={chartOptions} />
        </ChartCard>

        <ChartCard title="XP kiếm được theo chủ đề phụ">
        <Bar
  data={xpBarChartData}
  options={{
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y', // chuyển sang cột ngang
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
      },
      y: {
        grid: { display: false },
        ticks: {
          callback: function (value: string | number) {
            const label = value.toString();
            return label.length > 15 ? label.substring(0, 15) + "..." : label;

          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }}
/>

        </ChartCard>

        <ChartCard title="Số lần hoàn thành bài tập theo chủ đề phụ">
  <Bar
    data={completionPieChartData}
    options={{
      ...barOptions,       // Kế thừa cài đặt chung
      indexAxis: "y",      // Horizontal Bar
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: "rgba(156, 163, 175, 0.1)",
          },
        },
        y: {
          grid: {
            display: false,
          },
          // Rút gọn nhãn nếu quá dài
          ticks: {
            callback: function (value: string | number) {
              const label = value as string;
              return label.length > 15 ? label.substring(0, 15) + "..." : label;
            },
          },
        },
      },
    }}
  />
</ChartCard>

      </div>

      {/* Các card tóm tắt */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Tổng người dùng" value={users.length} bgColor="bg-blue-500" />
        <SummaryCard
          title="Tổng hoàn thành"
          value={completions.reduce((sum, comp) => sum + comp.count, 0)}
          bgColor="bg-purple-500"
        />
        <SummaryCard
          title="Tổng XP"
          value={completions.reduce((sum, comp) => sum + comp.earnedXP, 0)}
          bgColor="bg-orange-500"
        />
      </div>
    </div>
  );
};

export default Charts;
