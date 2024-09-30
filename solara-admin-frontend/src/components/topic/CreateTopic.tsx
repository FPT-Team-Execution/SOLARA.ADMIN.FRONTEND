import {useState} from "react";
import {Button, Form, Input, Modal} from 'antd';
import {PlusOutlined} from "@ant-design/icons";

const {TextArea} = Input;

interface IProps {
    handleReloadTable: () => void
}

const AddNewCategory = (props: IProps) => {
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    const handleOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values: any) => {
        setSubmitLoading(true);
    };

    return (
        <>
            <Button className={'bg-green-600'} type="primary" onClick={handleOpen}>
                <PlusOutlined/> Create topic
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
                            name="name"
                            rules={[{required: true, message: 'Please input the name!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{required: true, message: 'Please input the description!'}]}
                        >
                            <TextArea rows={4}/>
                        </Form.Item>

                        <Form.Item>
                            <Button loading={submitLoading} className={'bg-green-600'} type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
        </>
    );
};

export default AddNewCategory;