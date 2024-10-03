import { EditOutlined } from '@ant-design/icons'
import { Button, Modal, Input, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { UpsertFlashcardReqModel } from '../../types/flashcard.type'

const EditFlashcard = () => {

    const [form] = Form.useForm<UpsertFlashcardReqModel>();
    const [open, setOpen] = useState(false);

    const handleOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values) => {
    };

    return (
        <>
            <Button type="default" onClick={handleOpen} icon={<EditOutlined />}>
            </Button>
            <Modal
                open={open}
                title={'Edit topic'}
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
                            label="Name"
                            name="topicName"
                            rules={[{ required: true, message: 'Please input the name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="topicDescription"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item>
                            <Button className={'bg-green-600'} type="primary" htmlType="submit">
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
