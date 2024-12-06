import { Button, Form, Input, Modal } from "antd";
import { UpdateSubTopicRequest } from "../../types/subTopic";
import { useState } from "react";
import { useRequest } from "ahooks";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { collectionApi } from "../../utils/axios/collectionApi";

interface IProps {
    topicId: string
    handleReloadTable: () => void
}

const CreateCollection = (props: IProps) => {
    const [form] = Form.useForm<UpdateSubTopicRequest>();
    const [open, setOpen] = useState(false);

    const { loading, run: postCollection } = useRequest(async (values: UpdateSubTopicRequest) => {
        console.log("===", values);
        const request: UpdateSubTopicRequest = {
            name: values.name,
            description: values.description,
            topicId: props.topicId,
            subTopicId: values.subTopicId
        }
        const response = await collectionApi.postCollection(request);
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

    const handleSubmit = async (values: UpdateSubTopicRequest) => {
        postCollection(values);
    };

    return (
        <>
            <Button className={'bg-green-600'} type="primary" onClick={handleOpen} icon={<PlusOutlined />}>
                Create
            </Button>
            <Modal
                open={open}
                title={'Create new collection'}
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
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
        </>
    );
};

export default CreateCollection
