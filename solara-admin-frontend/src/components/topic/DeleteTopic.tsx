import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useRequest } from 'ahooks';
import { topicApi } from '../../utils/axios/topicApi';

interface IProps {
    id: string
    handleReloadTable: () => void
}

const DeleteTopic = (props: IProps) => {

    const { loading, run: deleteTopic } = useRequest(async () => {
        const response = await topicApi.deleteTopic(props.id);
        if (response.isSuccess) {
            // message.success('Topic deleted successfully!');
            props.handleReloadTable();
        } else {
            message.error('Failed to delete topic!');
            // props.handleReloadTable(); //DELETE AFTER
        }
    }, {
        manual: true
    });

    return (
        <Popconfirm
            title="Confirmation"
            description="Are you sure to delete?"
            onConfirm={() => deleteTopic()}
        >
            <Button
                loading={loading}
                type="primary"
                icon={<DeleteOutlined />}
                danger
            >
            </Button>
        </Popconfirm>
    )
}

export default DeleteTopic;