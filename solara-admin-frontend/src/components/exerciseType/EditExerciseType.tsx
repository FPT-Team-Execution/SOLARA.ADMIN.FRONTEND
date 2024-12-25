import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { exerciseTypeApi } from '../../utils/axios/exerciseTypeApi';
import { EditOutlined } from '@ant-design/icons';
import { ExerciseType, UpdateExerciseTypeRequest } from "../../types/exerciseType";

interface Props {
  exerciseType: ExerciseType;
  onSuccess: () => void;
}

const EditExerciseType = ({ exerciseType, onSuccess }: Props) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    form.setFieldsValue(exerciseType);
    setOpen(true);
  };

  const handleSubmit = async (values: UpdateExerciseTypeRequest) => {
    setLoading(true);
    try {
      const response = await exerciseTypeApi.updateExerciseType(exerciseType.id, values);
      if (response.isSuccess) {
        setOpen(false);
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to update exercise type:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Button 
        icon={<EditOutlined />}
        onClick={handleOpen}
      />
      <Modal
        title="Edit Exercise Type"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="default" onClick={() => setOpen(false)} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditExerciseType; 