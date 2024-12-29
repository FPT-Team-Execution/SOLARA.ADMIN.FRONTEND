import { Button, Input, Modal } from 'antd'
import { EditOutlined } from "@ant-design/icons";
import { Form } from 'antd';
import { TopicDto, UpdateTopicRequest } from '../../types/topic.type';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { topicApi } from '../../utils/axios/topicApi';
import TextArea from 'antd/es/input/TextArea';

interface IProps {
    topic: TopicDto,
    handleReloadTable: () => void
}

const EditTopic = (props: IProps) => {
    const [form] = Form.useForm<UpdateTopicRequest>();
    const [open, setOpen] = useState(false);

    const { loading, run: putTopic } = useRequest(async (id:string, value: UpdateTopicRequest) => {
        const request: UpdateTopicRequest = {
            topicName: value.topicName,
            topicDescription: value.topicDescription,
            topicId: id,
            thumbnail: value.thumbnail
        }

        const response = await topicApi.putTopic(request);
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
            topicDescription: props.topic.description!,
            thumbnail: props.topic.thumbnail
        })
    }

    const handleOpen = async () => {
        setInitialFormValues();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values: UpdateTopicRequest) => {
        putTopic(props.topic.topicId,values)
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

                        <Form.Item
                            label="Thumbnail"
                            name="thumbnail"
                            rules={[{ required: true, message: 'Please input the thumbnail URL!' }]}
                        >
                            <Input />
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
