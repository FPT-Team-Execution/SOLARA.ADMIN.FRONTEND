import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Spin,
  Typography,
  Progress,
  Tooltip,
  Empty,
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { userApi } from "../../utils/axios/userApi";
import { UserDto } from "../../types/user";
import { completionApi, CompletionDto } from "../../utils/axios/completionApi";
import { orderApi, OrderDto } from "../../utils/axios/orderApi";
import Charts from "../../components/dashboard/Charts";
import { IPageRequest } from "../../types/general.type";

const { Title, Text } = Typography;

interface StatisticCardProps {
  title: string;
  tooltip: string;
  value: number;
  icon: React.ReactNode;
  valueStyle: React.CSSProperties;
  growth: number;
  formatter?: (value: number) => string;
  progress?: number;
}

const StatisticCard = ({
  title,
  tooltip,
  value,
  icon,
  valueStyle,
  growth,
  formatter ,
  progress,
}: StatisticCardProps) => (
  <Card hoverable className="h-full" bodyStyle={{ padding: "20px" }}>
    <Statistic
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "8px" }}>{title}</span>
          <Tooltip title={tooltip}>
            <InfoCircleOutlined style={{ color: "#8c8c8c" }} />
          </Tooltip>
        </div>
      }
      value={value}
      prefix={icon}
      valueStyle={valueStyle}
      formatter={(value) => {
        if (formatter) {
          return formatter(value as number);
        } return value;
      }}
    />
    <div style={{ marginTop: "8px" }}>
      <Text
        className={growth >= 0 ? "text-green-500" : "text-red-500"}
        style={{ fontSize: "12px" }}
      >
        {growth >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        {Math.abs(growth)}% from last period
      </Text>
    </div>
    {progress !== undefined && (
      <div style={{ marginTop: "12px" }}>
        <Text
          type="secondary"
          style={{ fontSize: "12px", display: "block", marginBottom: "4px" }}
        >
          Order Fulfillment Rate
        </Text>
        <Tooltip title={`${progress.toFixed(1)}% of orders completed`}>
          <Progress
            percent={progress}
            size="small"
            status={
              progress >= 80 ? "success" : progress >= 60 ? "normal" : "exception"
            }
            showInfo={false}
          />
        </Tooltip>
      </div>
    )}
  </Card>
);

const Dashboard = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [completions, setCompletions] = useState<CompletionDto[]>([]);
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const params: IPageRequest = { page: 1, size: 10000 };
      try {
        const [userData, completionData, orderData] = await Promise.all([
          userApi.getUsers({ size: 10000, page: 1 }),
          completionApi.getCompletions({ size: 10000, page: 1 }),
          orderApi.getOrders(params),
        ]);
        setUsers(userData.responseRequest?.items || []);
        setCompletions(completionData.responseRequest?.items || []);
        setOrders(orderData.responseRequest?.items || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateTotalRevenue = () =>
    orders
      .filter((order) => order.orderStatus === "Completed")
      .reduce((sum, order) => sum + (order.total || 0), 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  // Growth rate calculations (using mock data)
  const getUserGrowth = () => (users.length > 0 ? 8.5 : 0);
  const getCompletionGrowth = () => (completions.length > 0 ? 12.3 : 0);
  const getRevenueGrowth = () => (orders.length > 0 ? 15.7 : 0);
  const getOrderGrowth = () => (orders.length > 0 ? -3.2 : 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Loading dashboard data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Empty
          description={<span className="text-red-500">{error}</span>}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  const completedOrders = orders.filter(
    (order) => order.orderStatus === "Completed"
  );
  const totalRevenue = calculateTotalRevenue();
  const fulfillmentRate =
    orders.length > 0 ? (completedOrders.length / orders.length) * 100 : 0;

  const userGrowth = getUserGrowth();
  const completionGrowth = getCompletionGrowth();
  const revenueGrowth = getRevenueGrowth();
  const orderGrowth = getOrderGrowth();

  return (
    <div className="container mx-auto px-4 py-6">
  <div className="mb-6">
    <Title level={2} className="mb-1">Dashboard Overview</Title>
    <Text type="secondary">
      Welcome to your business dashboard. Here's your performance at a glance.
    </Text>
  </div>

  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} lg={6}>
      <StatisticCard
        title="Total Users"
        tooltip="Total number of registered users"
        value={users.length}
        icon={<UserOutlined style={{ color: "#1890ff" }} />}
        valueStyle={{ color: "#1890ff" }}
        growth={userGrowth}
      />
    </Col>

    <Col xs={24} sm={12} lg={6}>
      <StatisticCard
        title="Total Completions"
        tooltip="Number of completed transactions"
        value={completions.length}
        icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
        valueStyle={{ color: "#52c41a" }}
        growth={completionGrowth}
      />
    </Col>

    <Col xs={24} sm={12} lg={6}>
      <StatisticCard
        title="Total Revenue"
        tooltip="Total revenue from completed orders"
        value={totalRevenue}
        icon={<DollarOutlined style={{ color: "#faad14" }} />}
        valueStyle={{ color: "#faad14" }}
        growth={revenueGrowth}
        formatter={formatCurrency}
      />
    </Col>

    <Col xs={24} sm={12} lg={6}>
      <StatisticCard
        title="Completed Orders"
        tooltip="Orders that have been successfully completed"
        value={completedOrders.length}
        icon={<ShoppingCartOutlined style={{ color: "#722ed1" }} />}
        valueStyle={{ color: "#722ed1" }}
        growth={orderGrowth}
        progress={fulfillmentRate}
      />
    </Col>
  </Row>

  <Row gutter={[16, 16]} className="mt-6">
  <Col xs={24}>
    <Card className="shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-medium">Analytics Insights</span>
        <Text type="secondary" className="text-sm">
          Last 30 days performance
        </Text>
      </div>
      {/* Giảm kích thước container biểu đồ xuống 200px */}
      <div style={{ minHeight: "200px" }}>
        <Charts users={users} completions={completions} />
      </div>
    </Card>
  </Col>
</Row>

</div>


  );
};

export default Dashboard;
