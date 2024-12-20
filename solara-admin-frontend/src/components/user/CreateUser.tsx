import { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { UpdateUserRequest } from '../../types/user';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
    onSuccess: () => void;
}

const CreateUser = ({ onSuccess }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async (values: UpdateUserRequest) => {
        try {
            const response = await fetch('/api/v1/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                onSuccess();
                setIsOpen(false);
                form.resetFields();
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>
            <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsOpen(true)}
            >
                Create User
            </Button>
            <Modal
                title="Create New User"
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input full name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="birthdate"
                        label="Birthdate"
                        rules={[{ required: true }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="avatarUrl"
                        label="Avatar URL"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="inactive">Inactive</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item className="flex justify-end gap-2">
                        <Button onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateUser;