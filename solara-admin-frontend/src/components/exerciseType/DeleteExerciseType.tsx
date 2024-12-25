import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { exerciseTypeApi } from '../../utils/axios/exerciseTypeApi';
import { useState } from 'react';

interface Props {
  id: string;
  onSuccess: () => void;
}

const DeleteExerciseType = ({ id, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await exerciseTypeApi.deleteExerciseType(id);
      if (response.isSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to delete exercise type:', error);
    }
    setLoading(false);
  };

  return (
    <Popconfirm
      title="Delete Exercise Type"
      description="Are you sure you want to delete this exercise type?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button 
        danger 
        icon={<DeleteOutlined />}
        loading={loading}
      />
    </Popconfirm>
  );
};

export default DeleteExerciseType; 