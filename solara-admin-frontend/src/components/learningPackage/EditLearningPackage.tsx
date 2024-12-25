import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { learningPackageApi } from '../../utils/axios/learningPackageApi';
import { LearningPackage, UpdateLearningPackageRequest } from '../../types/learningPackage.type';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  package: LearningPackage;
}

const EditLearningPackage = ({ open, onClose, onSuccess, package: learningPackage }: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && learningPackage) {
      form.setFieldsValue({
        name: learningPackage.name,
        description: learningPackage.description,
      });
    }
  }, [open, learningPackage, form]);

  const handleSubmit = async (values: UpdateLearningPackageRequest) => {
    setLoading(true);
    try {
      const response = await learningPackageApi.updateLearningPackage(learningPackage.id, values);
      if (response.isSuccess) {
        onClose();
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to update learning package:', error);
    }
    setLoading(false);
  };

  return (
    <Modal
      title="Edit Learning Package"
      open={open}
      onCancel={onClose}
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
          <Button type="default" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditLearningPackage; 