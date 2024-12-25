import { Button, Form, Input, Modal, InputNumber, Switch } from 'antd';
import { useState } from 'react';
import { exerciseTypeApi } from '../../utils/axios/exerciseTypeApi';
import { PlusOutlined } from '@ant-design/icons';

interface CreateExerciseTypeRequest {
  name: string;
  description: string;
  externalLink?: string;
  maxOptions: number;
  isMultipleChoice: boolean;
}

interface Props {
  onSuccess: () => void;
}

const CreateExerciseType = ({ onSuccess }: Props) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CreateExerciseTypeRequest) => {
    setLoading(true);
    try {
      const response = await exerciseTypeApi.createExerciseType(values);
      if (response.isSuccess) {
        setOpen(false);
        form.resetFields();
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to create exercise type:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Button 
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      >
        Create Exercise Type
      </Button>
      <Modal
        title="Create Exercise Type"
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

          <Form.Item
            name="externalLink"
            label="External Link"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="maxOptions"
            label="Max Options"
            rules={[{ required: true, message: 'Please input max options!' }]}
          >
            <InputNumber min={1} max={2147483647} className="w-full" />
          </Form.Item>

          <Form.Item
            name="isMultipleChoice"
            label="Multiple Choice"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>

          <Form.Item className="flex justify-end">
            <Button type="default" onClick={() => setOpen(false)} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateExerciseType; 