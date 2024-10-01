import { Button, Input, Modal } from 'antd'
import { EditOutlined } from "@ant-design/icons";
import { Form } from 'antd';
import { TopicModel, UpsertTopicReqModel } from '../../types/topic.type';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { topicApi } from '../../utils/axios/topicApi';
import TextArea from 'antd/es/input/TextArea';

interface IProps {
    topic: TopicModel,
    handleReloadTable: () => void
}

const EditTopic = (props: IProps) => {
    const [form] = Form.useForm<UpsertTopicReqModel>();
    const [open, setOpen] = useState(false);

    const { loading, run: putTopic } = useRequest(async (id: string, value: UpsertTopicReqModel) => {
        const request: UpsertTopicReqModel = {
            topicName: value.topicName,
            topicDescription: value.topicDescription
        }
        const response = await topicApi.putTopic(id, request);
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

    const setInitialFormValues = () => {
        form.setFieldsValue({
            topicName: props.topic.topicName!,
            topicDescription: props.topic.description!
        })
    }

    const handleOpen = async () => {
        setInitialFormValues();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values: UpsertTopicReqModel) => {
        putTopic(props.topic.topicId, values)
    };

    return (
        <>
            <Button className={'bg-green-600'} type="primary" onClick={handleOpen}>
                <EditOutlined />
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
                            <Button loading={loading} className={'bg-green-600'} type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
        </>
    );
}

export default EditTopic
