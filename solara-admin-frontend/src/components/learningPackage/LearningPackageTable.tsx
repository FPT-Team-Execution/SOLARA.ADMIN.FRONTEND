import { Table, Space, Button, Switch, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { LearningPackage } from '../../types/learningPackage.type';
import { learningPackageApi } from '../../utils/axios/learningPackageApi';

interface Props {
  data: LearningPackage[];
  loading: boolean;
  onEdit: (record: LearningPackage) => void;
  onRefresh: () => void;
}

const LearningPackageTable = ({ data, loading, onEdit, onRefresh }: Props) => {
  const [updatingValidity, setUpdatingValidity] = useState<string | null>(null);

  const handleValidityChange = async (checked: boolean, record: LearningPackage) => {
    setUpdatingValidity(record.id);
    try {
      const response = await learningPackageApi.updatePackageValidity(record.id, checked);
      if (response.isSuccess) {
        message.success('Package validity updated successfully');
        onRefresh();
      }
    } catch {
      message.error('Failed to update package validity');
    }
    setUpdatingValidity(null);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Valid',
      dataIndex: 'isValid',
      key: 'isValid',
      render: (isValid: boolean, record: LearningPackage) => (
        <Switch
          checked={isValid}
          onChange={(checked) => handleValidityChange(checked, record)}
          loading={updatingValidity === record.id}
        />
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: LearningPackage) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
    />
  );
};

export default LearningPackageTable; 