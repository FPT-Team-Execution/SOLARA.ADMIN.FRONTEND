import { EditOutlined } from "@ant-design/icons"
import { Button, Modal, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import { Form } from "antd"
import { UpsertCollectionReqModel } from "../../types/collection.type"
import { useState } from "react"

const EditCollection = () => {
    const [form] = Form.useForm<UpsertCollectionReqModel>();
    const [open, setOpen] = useState(false);

    const handleOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values: UpsertCollectionReqModel) => {
    };

    return (
        <>
            <Button type="default" onClick={handleOpen}>
                <EditOutlined />
            </Button>
            <Modal
                open={open}
                title={'Edit collection'}
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

export default EditCollection
