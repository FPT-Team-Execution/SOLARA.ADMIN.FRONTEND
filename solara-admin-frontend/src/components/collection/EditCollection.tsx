import { EditOutlined } from "@ant-design/icons"
import { Button, Modal, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import { Form } from "antd"
import { SubTopicDto, UpdateSubTopicRequest } from "../../types/subTopic"

import { useState } from "react"
import { useRequest } from "ahooks"
import { collectionApi } from "../../utils/axios/collectionApi"

interface IProps {
    topicId: string
    collection: SubTopicDto,
    handleReloadTable: () => void
}

const EditCollection = (props: IProps) => {
    const [form] = Form.useForm<UpdateSubTopicRequest>();
    const [open, setOpen] = useState(false);

    const setInitialFormValues = () => {
        form.setFieldsValue({
            name: props.collection.name!,
            description: props.collection.description!,
            topicId: props.collection.id
        })
    }

    const { loading, run: putCollection } = useRequest(async (id: string, values: UpdateSubTopicRequest) => {
        
        const request: UpdateSubTopicRequest = {
            name: values.name,
            description: values.description,
            topicId: props.topicId,
            subTopicId: props.collection.id //UPDATE SUBTOPIC LATER
        }
        const response = await collectionApi.putCollection(id, request);
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
    })

    const handleOpen = async () => {
        setInitialFormValues();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values: UpdateSubTopicRequest) => {
        putCollection(props.collection.id, values)
    };

    return (
        <>
            <Button type="default" onClick={handleOpen} icon={<EditOutlined />}>
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
                            name="name"
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

export default EditCollection
