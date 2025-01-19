import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { learningPackageApi } from '../../utils/axios/learningPackageApi';
import { CreateLearningPackageRequest } from '../../types/learningPackage.type';

interface Props {
  onSuccess: () => void;
}

const CreateLearningPackage = ({ onSuccess }: Props) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CreateLearningPackageRequest) => {
    setLoading(true);
    try {
      const response = await learningPackageApi.createLearningPackage(values);
      if (response.isSuccess) {
        setOpen(false);
        form.resetFields();
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to create learning package:', error);
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
        Create Learning Package
      </Button>
      <Modal
        title="Create Learning Package"
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
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateLearningPackage; 