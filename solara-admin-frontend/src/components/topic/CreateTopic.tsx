import { useState } from "react";
import { Button, Form, Input, Modal } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { UpsertTopicReqModel } from "../../types/topic.type";
import { topicApi } from "../../utils/axios/topicApi";
import { useRequest } from "ahooks";

const { TextArea } = Input;

interface IProps {
    handleReloadTable: () => void
}

const CreateTopic = (props: IProps) => {
    const [form] = Form.useForm<UpsertTopicReqModel>();
    const [open, setOpen] = useState(false);

    const { loading, run: postTopic } = useRequest(async (value: UpsertTopicReqModel) => {
        const request: UpsertTopicReqModel = {
            topicName: value.topicName,
            topicDescription: value.topicDescription
        }
        const response = await topicApi.postTopic(request);
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

    const handleSubmit = async (values: UpsertTopicReqModel) => {
        postTopic(values)
    };

    return (
        <>
            <Button className={'bg-green-600'} type="primary" onClick={handleOpen} icon={<PlusOutlined />}>
                Create
            </Button>
            <Modal
                open={open}
                title={'Create new topic'}
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
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
        </>
    );
};

export default CreateTopic;