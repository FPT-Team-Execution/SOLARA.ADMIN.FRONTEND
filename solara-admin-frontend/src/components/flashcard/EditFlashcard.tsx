import { EditOutlined } from '@ant-design/icons'
import { Button, Modal, Input, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { FlashcardModel, UpsertFlashcardReqModel } from '../../types/flashcard.type'
import { flashcardApi } from '../../utils/axios/flashcardApi'
import { useRequest } from 'ahooks'

interface IProps {
    handleReloadTable: () => void
    flashcard: FlashcardModel
}

const EditFlashcard = (props: IProps) => {

    const [form] = Form.useForm<UpsertFlashcardReqModel>();
    const [open, setOpen] = useState(false);

    const setInitialFormValues = () => {
        form.setFieldsValue({
            answer: props.flashcard.answer!,
            collectionId: props.flashcard.collectionId!,
            difficulty: props.flashcard.difficulty!,
            question: props.flashcard.question!,
            imageUrl: props.flashcard.imageUrl!,
            videoUrl: props.flashcard.videoUrl!
        })
    }

    const { loading, run: putFlashcard } = useRequest(async (id: string, values: UpsertFlashcardReqModel) => {
        const request: UpsertFlashcardReqModel = {
            answer: values.answer,
            collectionId: props.flashcard.collectionId,
            difficulty: values.difficulty,
            question: values.question,
            imageUrl: values.imageUrl,
            videoUrl: values.videoUrl
        }
        const response = await flashcardApi.putFlashcard(id, request);
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
        setInitialFormValues()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values: UpsertFlashcardReqModel) => {
        putFlashcard(props.flashcard.flashcardId, values)
    };



    return (
        <>
            <Button type="default" onClick={handleOpen} icon={<EditOutlined />}>
            </Button>
            <Modal
                open={open}
                title={'Edit flashcard'}
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
                            rules={[{ required: false, message: 'Please input the image url!' }]}
                        >
                            <TextArea rows={2} />
                        </Form.Item>

                        <Form.Item
                            label="Video Url"
                            name="videoUrl"
                            rules={[{ required: false, message: 'Please input the video url!' }]}
                        >
                            <TextArea rows={2} />
                        </Form.Item>

                        <Form.Item>
                            <Button loading={loading} className={'bg-green-600'} type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
        </>
    )
}

export default EditFlashcard
