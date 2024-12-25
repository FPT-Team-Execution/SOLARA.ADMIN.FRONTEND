import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons"
import { Button, Modal, Input, Form, InputNumber, Select, Switch, message } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useRequest } from "ahooks"
import { useState, useEffect } from "react"
import { flashcardApi } from "../../utils/axios/flashcardApi"
import { exerciseTypeApi } from "../../utils/axios/exerciseTypeApi"

interface Answer {
  optionText: string;
  explanation: string;
  isCorrect: boolean;
}

interface CreateExerciseRequest {
  subTopicId: string;
  xp: number;
  question: string;
  imageUrl?: string;
  videoUrl?: string;
  difficulty: string;
  exerciseTypeId: string;
  answers: Answer[];
}

interface ExerciseType {
  id: string;
  name: string;
  description: string;
}

interface IProps {
  subTopicId: string
  handleReloadTable: () => void
}

const CreateFlashcard = (props: IProps) => {
  const [form] = Form.useForm<CreateExerciseRequest>();
  const [open, setOpen] = useState(false);
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [exerciseTypesLoading, setExerciseTypesLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchExerciseTypes();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        subTopicId: props.subTopicId
      });
    }
  }, [open, props.subTopicId]);

  const fetchExerciseTypes = async () => {
    try {
      setExerciseTypesLoading(true);
      const response = await exerciseTypeApi.getExerciseTypes();
      if (response?.isSuccess) {
        const types = response.responseRequest.items || [];

        setExerciseTypes(types);
      }

    } catch (error) {
      console.error('Failed to fetch exercise types:', error);
    } finally {
      setExerciseTypesLoading(false);
    }
  };

  const difficultyOptions = [
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' }
  ];

  const { loading, run: postFlashcard } = useRequest(async (values: CreateExerciseRequest) => {
    const response = await flashcardApi.postFlashcard(values);
    if (response.isSuccess == true) {
      form.resetFields();
      setOpen(false);
      props.handleReloadTable();
      message.success('Exercise created successfully');
    }
  }, {
    manual: true
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (values: CreateExerciseRequest) => {
    const formattedValues = {
      ...values,
      answers: values.answers.map(answer => ({
        ...answer,
        isCorrect: answer.isCorrect || false
      }))
    };
    postFlashcard(formattedValues);
  };

  return (
    <>
      <Button className={'bg-green-600'} type="primary" onClick={handleOpen} icon={<PlusOutlined />}>
        Create
      </Button>
      <Modal
        open={open}
        title={'Create new exercise'}
        onCancel={handleClose}
        width={800}
        footer={[
          <Button key="back" onClick={handleClose}>
            Cancel
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: 'Please input the question!' }]}
          >
            <TextArea rows={2} />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              className="w-1/2"
              label="Difficulty"
              name="difficulty"
              rules={[{ required: true, message: 'Please select difficulty!' }]}
            >
              <Select options={difficultyOptions} />
            </Form.Item>

            <Form.Item
              className="w-1/2"
              label="XP"
              name="xp"
              rules={[{ required: true, message: 'Please input XP!' }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>

          <Form.Item
            label="Exercise Type"
            name="exerciseTypeId"
            rules={[{ required: true, message: 'Please select exercise type!' }]}
          >
            <Select loading={exerciseTypesLoading}>
              {exerciseTypes.map(type => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="subTopicId"
            hidden
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="imageUrl"
          >
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item
            label="Video URL"
            name="videoUrl"
          >
            <TextArea rows={2} />
          </Form.Item>

          <div className="border p-4 rounded-md mb-4">
            <h3 className="mb-4">Answers</h3>
            <Form.List name="answers">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="flex gap-4 items-start mb-4">
                      <div className="flex-1">
                        <Form.Item
                          {...restField}
                          name={[name, 'optionText']}
                          rules={[{ required: true, message: 'Missing option text' }]}
                        >
                          <TextArea placeholder="Answer option" rows={2} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'explanation']}
                          rules={[{ required: true, message: 'Missing explanation' }]}
                        >
                          <TextArea placeholder="Explanation" rows={2} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'isCorrect']}
                          valuePropName="checked"
                          initialValue={false}
                        >
                          <Switch checkedChildren="Correct" unCheckedChildren="Incorrect" />
                        </Form.Item>
                      </div>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Answer
                  </Button>
                </>
              )}
            </Form.List>
          </div>

          <Form.Item>
            <Button loading={loading} className={'bg-green-600'} type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateFlashcard