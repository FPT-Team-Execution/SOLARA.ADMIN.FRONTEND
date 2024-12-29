import { useState } from "react";
import { Button, Form, Input, Modal, Upload, message } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { CreateTopicRequest } from "../../types/topic.type";
import { topicApi } from "../../utils/axios/topicApi";
import { useRequest } from "ahooks";
import type { UploadFile, RcFile } from 'antd/es/upload/interface';

const { TextArea } = Input;

interface IProps {
    handleReloadTable: () => void
}

const CreateTopic = (props: IProps) => {
    const [form] = Form.useForm<CreateTopicRequest>();
    const [open, setOpen] = useState(false);
    const [thumbnail, setThumbnail] = useState<UploadFile | null>(null);

    const { loading, run: postTopic } = useRequest(async (values: CreateTopicRequest) => {
        const formData = new FormData();
        formData.append('TopicName', values.topicName);
        formData.append('TopicDescription', values.topicDescription);
        
        if (thumbnail) {
            if (thumbnail instanceof File) {
                formData.append('Thumbnail', thumbnail, thumbnail.name);
            } 
            else if (thumbnail.originFileObj) {
                formData.append('Thumbnail', thumbnail.originFileObj, thumbnail.originFileObj.name);
            }
        }

        const response = await topicApi.postTopic(formData);
        if (response.isSuccess === true) {
            form.resetFields();
            setThumbnail(null);
            setOpen(false);
            props.handleReloadTable();
        }
    }, {
        manual: true
    });

    const beforeUpload = (file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
            return false;
        }
        
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            return false;
        }

        const uploadFile: UploadFile = {
            uid: `rc-upload-${Date.now()}`,
            name: file.name,
            status: 'done',
            size: file.size,
            type: file.type,
            lastModifiedDate: new Date(file.lastModified),
            originFileObj: file as RcFile
        };

        setThumbnail(uploadFile);
        return false;
    };

    const handleOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values: CreateTopicRequest) => {
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

                        <Form.Item
                            label="Thumbnail"
                            rules={[{ required: true, message: 'Please upload thumbnail!' }]}
                            validateStatus={!thumbnail ? 'error' : 'success'}
                            help={!thumbnail && 'Please upload thumbnail!'}
                        >
                            <Upload
                                maxCount={1}
                                listType="picture-card"
                                beforeUpload={beforeUpload}
                                onRemove={() => setThumbnail(null)}
                                fileList={thumbnail ? [thumbnail] : []}
                                accept="image/*"
                            >
                                {!thumbnail && '+ Upload'}
                            </Upload>
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