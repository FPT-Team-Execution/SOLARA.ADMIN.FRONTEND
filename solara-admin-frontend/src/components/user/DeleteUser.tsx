import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
    userId: string;
    onSuccess: () => void;
}

const DeleteUser = ({ userId, onSuccess }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/v1/users/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                message.success('User deleted successfully');
                onSuccess();
                setIsOpen(false);
            } else {
                message.error('Failed to delete user');
            }
        } catch (error) {
            message.error('Error deleting user');
            console.error('Error deleting user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button 
                danger
                icon={<DeleteOutlined />}
                onClick={() => setIsOpen(true)}
            >
                Delete
            </Button>
            <Modal
                title="Confirm Delete"
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                okText="Yes, Delete"
                cancelText="Cancel"
                okButtonProps={{ 
                    loading: loading,
                    danger: true 
                }}
                onOk={handleDelete}
            >
                <p>Are you sure you want to delete this user?</p>
            </Modal>
        </>
    );
};

export default DeleteUser;