import { Button, Modal, Form, Switch, message } from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { flashcardApi } from '../../utils/axios/flashcardApi';
import TextArea from 'antd/es/input/TextArea';

interface Option {
  id: string;
  optionText: string;
  explanation: string;
  isCorrect: boolean;
}

interface IProps {
  exerciseId: string;
  options: any[];
  onOptionsUpdate: () => void;
}

const ManageOptions = ({ exerciseId, options, onOptionsUpdate }: IProps) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [existingOptions, setExistingOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingOptionId, setUpdatingOptionId] = useState<string | null>(null);
  const [deletingOptionId, setDeletingOptionId] = useState<string | null>(null);

  const refreshOptions = async () => {
    setLoading(true);
    try {
      const response = await flashcardApi.getExercise(exerciseId);
      if (response.isSuccess) {
        const options = response.responseRequest.ans.map(answer => ({
          id: answer.id,
          optionText: answer.optionText,
          explanation: answer.explanation,
          isCorrect: answer.isCorrect || false
        }));
        setExistingOptions(options);
        onOptionsUpdate();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      refreshOptions();
    }
  }, [open]);

  const { loading: addLoading, run: addOption } = useRequest(
    async (values: { optionText: string; explanation: string; isCorrect: boolean }) => {
      try {
        const response = await flashcardApi.postOption(exerciseId, {
          optionText: values.optionText,
          explanation: values.explanation,
          isCorrect: values.isCorrect || false
        });
        
        if (response.isSuccess) {
          message.success('Option added successfully');
          form.resetFields();
          await refreshOptions();
        }
      } catch (error) {
        message.error('Failed to add option');
      }
    },
    { manual: true }
  );

  const handleUpdateOption = async (optionId: string, values: any) => {
    setUpdatingOptionId(optionId);
    try {
      const response = await flashcardApi.putOption(exerciseId, optionId, {
        optionText: values.optionText,
        explanation: values.explanation,
        isCorrect: values.isCorrect || false
      });
      
      if (response.isSuccess) {
        message.success('Option updated successfully');
        await refreshOptions();
      }
    } catch (error) {
      message.error('Failed to update option');
    } finally {
      setUpdatingOptionId(null);
    }
  };

  const handleDeleteOption = async (optionId: string) => {
    setDeletingOptionId(optionId);
    try {
      const response = await flashcardApi.deleteOption(exerciseId, optionId);
      if (response.isSuccess) {
        message.success('Option deleted successfully');
        await refreshOptions();
      }
    } catch (error) {
      message.error('Failed to delete option');
    } finally {
      setDeletingOptionId(null);
    }
  };

  const handleAddOption = async (values: any) => {
    await addOption(values);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} icon={<PlusOutlined />}>
        
      </Button>

      <Modal
        open={open}
        title="Manage Answer Options"
        onCancel={() => setOpen(false)}
        width={800}
        footer={null}
      >
        <div className="mb-4">
          <h3 className="font-bold mb-2">Add New Option</h3>
          <Form 
            form={form} 
            onFinish={handleAddOption} 
            layout="vertical"
            initialValues={{ isCorrect: false }}
          >
            <Form.Item
              name="optionText"
              label="Option Text"
              rules={[{ required: true, message: 'Please input option text!' }]}
            >
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item
              name="explanation"
              label="Explanation"
              rules={[{ required: true, message: 'Please input explanation!' }]}
            >
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item
              name="isCorrect"
              valuePropName="checked"
            >
              <Switch checkedChildren="Correct" unCheckedChildren="Incorrect" />
            </Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={addLoading}
              className="bg-blue-500"
            >
              Add Option
            </Button>
          </Form>
        </div>

        <div>
          <h3 className="font-bold mb-2">Existing Options</h3>
          {loading ? (
            <div>Loading options...</div>
          ) : (
            existingOptions.map((option) => (
              <div key={option.id} className="border p-4 mb-4 rounded">
                <Form
                  initialValues={option}
                  onFinish={(values) => handleUpdateOption(option.id, values)}
                  layout="vertical"
                >
                  <Form.Item
                    name="optionText"
                    label="Option Text"
                    rules={[{ required: true }]}
                  >
                    <TextArea rows={2} />
                  </Form.Item>
                  <Form.Item
                    name="explanation"
                    label="Explanation"
                    rules={[{ required: true }]}
                  >
                    <TextArea rows={2} />
                  </Form.Item>
                  <Form.Item
                    name="isCorrect"
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="Correct" unCheckedChildren="Incorrect" />
                  </Form.Item>
                  <div className="flex gap-2">
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={updatingOptionId === option.id}
                      className="bg-blue-500"
                    >
                      Update
                    </Button>
                    <Button 
                      danger 
                      onClick={() => handleDeleteOption(option.id)}
                      loading={deletingOptionId === option.id}
                    >
                      Delete
                    </Button>
                  </div>
                </Form>
              </div>
            ))
          )}
        </div>
      </Modal>
    </>
  );
};

export default ManageOptions; 