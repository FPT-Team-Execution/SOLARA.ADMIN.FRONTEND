import { Button, Modal, Form, Switch, message } from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { flashcardApi } from '../../utils/axios/flashcardApi';
import TextArea from 'antd/es/input/TextArea';
import { AnswerDto } from '../../types/exercise';

interface IProps {
  exerciseId: string;
  options: AnswerDto[];
  onOptionsUpdate: () => void;
}

const ManageOptions = ({ exerciseId, onOptionsUpdate }: IProps) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [options, setOptions] = useState<AnswerDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState<string | null>(null);

  const refreshOptions = async () => {
    setLoading(true);
    try {
      const response = await flashcardApi.getExercise(exerciseId);
      if (response.isSuccess) {
        const options = response.responseRequest.ans.map((answer: AnswerDto) => ({
          id: answer.id,
          optionText: answer.optionText,
          explanation: answer.explanation,
          isCorrect: answer.isCorrect,
        }));
        setOptions(options);
        onOptionsUpdate();
      } else {
        message.error('Failed to load options');
      }
    } catch (error) {
      message.error('Error fetching options' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      refreshOptions();
    }
  }, [open]);

  const handleAddOption = async (values: AnswerDto) => {
    try {
      const response = await flashcardApi.postOption(exerciseId, values);
      if (response.isSuccess) {
        message.success('Option added successfully');
        form.resetFields();
        refreshOptions();
      } else {
        message.error('Failed to add option');
      }
    } catch (error) {
      message.error('Error adding option' + error);
    }
  };

  const handleUpdateOption = async (optionId: string, values: AnswerDto) => {
    setActiveOptionId(optionId);
    try {
      const response = await flashcardApi.putOption(exerciseId, optionId, values);
      if (response.isSuccess) {
        message.success('Option updated successfully');
        refreshOptions();
      } else {
        message.error('Failed to update option');
      }
    } catch (error) {
      message.error('Error updating option' + error);
    } finally {
      setActiveOptionId(null);
    }
  };

  const handleDeleteOption = async (optionId: string) => {
    setActiveOptionId(optionId);
    try {
      const response = await flashcardApi.deleteOption(exerciseId, optionId);
      if (response.isSuccess) {
        message.success('Option deleted successfully');
        refreshOptions();
      } else {
        message.error('Failed to delete option');
      }
    } catch (error) {
      message.error('Error deleting option'+ error);
    } finally {
      setActiveOptionId(null);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} icon={<PlusOutlined />}>
      </Button>

      <Modal
        open={open}
        title="Manage Answer Options"
        onCancel={() => setOpen(false)}
        width={1200}
        footer={null}
      >
        <div>
          <h3>Add New Option</h3>
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
            <Form.Item name="isCorrect" valuePropName="checked">
              <Switch checkedChildren="Correct" unCheckedChildren="Incorrect" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Option
            </Button>
          </Form>
        </div>

        <div className="mt-4">
          <h3>Existing Options</h3>
          {loading ? (
            <div>Loading options...</div>
          ) : (
            options.map((option) => (
              <div key={option.id} className="border p-4 mb-4 rounded">
                <Form
                  initialValues={option}
                  onFinish={(values) => handleUpdateOption(option.id, values)}
                  layout="vertical"
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
                  <Form.Item name="isCorrect" valuePropName="checked" initialValue={option.isCorrect}>
                    <Switch checkedChildren="Correct" unCheckedChildren="Incorrect" />
                  </Form.Item>
                  <div className="flex gap-2">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={activeOptionId === option.id}
                    >
                      Update
                    </Button>
                    <Button
                      danger
                      onClick={() => handleDeleteOption(option.id)}
                      loading={activeOptionId === option.id}
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
