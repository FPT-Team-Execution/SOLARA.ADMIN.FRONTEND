import { Button, Popconfirm } from 'antd'
import { DeleteOutlined } from "@ant-design/icons";
import { useRequest } from 'ahooks';
import { topicApi } from '../../utils/axios/topicApi';

interface IProps {
    id: string
    handleReloadTable: () => void
}

const DeleteTopic = (props: IProps) => {

    const { loading, run: deleteTopic } = useRequest(async () => {
        const response = await topicApi.deleteTopic(props.id)
        if (response.isSuccess == true) {
            props.handleReloadTable()
        }
    }, {
        manual: true
    })

    return (
        <Popconfirm
            className={'bg-red-600'}
            title="Confirmation"
            description="Are you sure to delete?"
            onConfirm={() => deleteTopic()}
        >
            <Button
                loading={loading}
                className={'bg-red-500'}
                type="primary"
                block
            >
                <DeleteOutlined />
            </Button>
        </Popconfirm>

    )
}

export default DeleteTopic
