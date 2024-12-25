import { EditOutlined } from '@ant-design/icons'
import { Button, Modal, Input, Form, Select, InputNumber } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { ExerciseDto } from '../../types/exercise'
import { useFlashcardStore } from '../../stores/flashcardStore'

interface IProps {
  handleReloadTable: () => void
  flashcard: ExerciseDto
}

const EditFlashcard = (props: IProps) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateFlashcard = useFlashcardStore(state => state.updateFlashcard)

  const difficultyOptions = [
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' }
  ];

  const setInitialFormValues = () => {
    form.setFieldsValue({
      exerciseId: props.flashcard.id,
      question: props.flashcard.question,
      difficulty: props.flashcard.difficulty,
      xp: props.flashcard.xp,
      subTopicId: props.flashcard.subTopicId,
      imageUrl: props.flashcard.imageUrl,
      videoUrl: props.flashcard.videoUrl,
    });
  }

  const handleOpen = () => {
    setInitialFormValues();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const success = await updateFlashcard({
      ...values,
      exerciseId: props.flashcard.id
    });
    
    if (success) {
      form.resetFields();
      setOpen(false);
      props.handleReloadTable();
    }
    setLoading(false);
  }

  return (
    <>
      <Button type="default" onClick={handleOpen} icon={<EditOutlined />} />
      <Modal
        open={open}
        title={'Edit exercise'}
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
            name="exerciseId"
            hidden={true}
          >
            <Input />
          </Form.Item>

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
            label="Sub Topic ID"
            name="subTopicId"
            rules={[{ required: true, message: 'Please input sub topic ID!' }]}
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

          <Form.Item>
            <Button loading={loading} className={'bg-green-600'} type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditFlashcard
