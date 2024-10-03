import { PlusOutlined } from "@ant-design/icons"
import { Button, Modal, Input, Form } from "antd"
import TextArea from "antd/es/input/TextArea"
import { UpsertFlashcardReqModel } from "../../types/flashcard.type"
import { useRequest } from "ahooks"
import { useState } from "react"
import { flashcardApi } from "../../utils/axios/flashcardApi"

interface IProps {
  collectionId: string
  handleReloadTable: () => void
}

const CreateFlashcard = (props: IProps) => {

  const [form] = Form.useForm<UpsertFlashcardReqModel>();
  const [open, setOpen] = useState(false);

  const { loading, run: postFlashcard } = useRequest(async (values: UpsertFlashcardReqModel) => {
    const request: UpsertFlashcardReqModel = {
      question: values.question,
      answer: values.answer,
      difficulty: values.difficulty,
      imageUrl: values.imageUrl,
      videoUrl: values.videoUrl,
      collectionId: props.collectionId
    }
    const response = await flashcardApi.postFlashcard(request);
    if (response.isSuccess == true) {
      form.resetFields();
      setOpen(false);
      props.handleReloadTable();
    }
  }, {
    manual: true,
    onError: () => {
    },
    onSuccess: () => {
    }
  });

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: UpsertFlashcardReqModel) => {
    postFlashcard(values)
  };

  return (
    <>
      <Button className={'bg-green-600'} type="primary" onClick={handleOpen} icon={<PlusOutlined />}>
        Create
      </Button>
      <Modal
        open={open}
        title={'Create new flashcard'}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Cancel
          </Button>,
        ]}
      >
        <div className={'flex w-full gap-2'}>
          <Form className={'w-full'} form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Question"
              name="question"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item
              label="Answer"
              name="answer"
              rules={[{ required: true, message: 'Please input the answer!' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Difficulty"
              name="difficulty"
              rules={[{ required: true, message: 'Please input the video url!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Image Url"
              name="imageUrl"
              rules={[{ required: true, message: 'Please input the image url!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Video Url"
              name="videoUrl"
              rules={[{ required: true, message: 'Please input the video url!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button loading={loading} className={'bg-green-600'} type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>

      </Modal>
    </>
  )
}

export default CreateFlashcard