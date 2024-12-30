import { Table, Space, Button } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { exerciseTypeApi } from '../../utils/axios/exerciseTypeApi';
import CreateExerciseType from './CreateExerciseType';
import EditExerciseType from './EditExerciseType';
import DeleteExerciseType from './DeleteExerciseType';
import { ReloadOutlined } from '@ant-design/icons';
import AppTableQuery from '../general/AppTableQuery';
import { IPageRequest, IPaginate } from '../../types/general.type';

interface ExerciseType {
  id: string;
  name: string;
  description: string;
  isMultipleChoice: boolean;
  minOptions: number;
  maxOptions: number;
}

const ExerciseTypeTable = () => {
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<IPaginate<ExerciseType>>({
    size: 10,
    page: 1,
    total: 0,
    totalPages: 0,
    items: []
  });
  const [query, setQuery] = useState<IPageRequest>({
    page: 1,
    size: 10,
    isAscending: true,
    orderOn: ''
  });

  const fetchExerciseTypes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await exerciseTypeApi.getExerciseTypes();
      if (response.isSuccess) {
        setExerciseTypes(response.responseRequest.items);
        setPagination({
          total: response.responseRequest.total,
          page: response.responseRequest.page,
          size: response.responseRequest.size,
          totalPages: response.responseRequest.totalPages,
          items: response.responseRequest.items
        });
      }
    } catch (error) {
      console.error('Failed to fetch exercise types:', error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchExerciseTypes();
  }, [query, fetchExerciseTypes]);

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
      title: 'Multiple Choice',
      dataIndex: 'isMultipleChoice',
      key: 'isMultipleChoice',
      render: (value: boolean) => value ? 'Yes' : 'No'
    },
    {
      title: 'Min Options',
      dataIndex: 'minOptions',
      key: 'minOptions',
    },
    {
      title: 'Max Options',
      dataIndex: 'maxOptions',
      key: 'maxOptions',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: ExerciseType) => (
        <Space>
          <EditExerciseType 
            exerciseType={record} 
            onSuccess={fetchExerciseTypes} 
          />
          <DeleteExerciseType 
            id={record.id} 
            onSuccess={fetchExerciseTypes} 
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div>
          <AppTableQuery 
            page={pagination} 
            query={query} 
            updateQuery={(key, value) => setQuery({...query, [key]: value})}
          />
        </div>
        <Space>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={fetchExerciseTypes}
          >
            Reload
          </Button>
          <CreateExerciseType onSuccess={fetchExerciseTypes} />
        </Space>
      </div>

      <Table 
        dataSource={exerciseTypes} 
        columns={columns} 
        loading={loading}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
};

export default ExerciseTypeTable; 