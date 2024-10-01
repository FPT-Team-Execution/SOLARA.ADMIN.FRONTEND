import { EditOutlined } from "@ant-design/icons"
import { Button, Modal, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import { Form } from "antd"
import { CollectionModel, UpsertCollectionReqModel } from "../../types/collection.type"
import { useState } from "react"

interface IProps {
    collection: CollectionModel
}

const EditCollection = (props: IProps) => {
    const [form] = Form.useForm<UpsertCollectionReqModel>();
    const [open, setOpen] = useState(false);

    const setInitialFormValues = () => {
        form.setFieldsValue({
            collectionName: props.collection.collectionName!,
            description: props.collection.description!,
            topicId: props.collection.topicId
        })
    }

    const handleOpen = async () => {
        setOpen(true);
        setInitialFormValues();
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
                            name="collectionName"
                            rules={[{ required: true, message: 'Please input the name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
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
