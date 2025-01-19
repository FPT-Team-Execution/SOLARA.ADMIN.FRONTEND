import { DeleteOutlined } from "@ant-design/icons"
import { Button, Popconfirm } from "antd"
import {collectionApi} from '../../utils/axios/collectionApi'
import { useRequest } from "ahooks"

interface IProps {
    id: string,
    handleReloadTable: () => void
}

const DeleteCollection = (props: IProps) => {
    const { loading, run: deleteCollection } = useRequest(async () => {
        const response = await collectionApi.deleteCollection(props.id)
        if (response.data.isSuccess === true) {
            props.handleReloadTable()
        }
    }, {
        manual: true
    })

    return (
        <>
            <Popconfirm
                title="Confirmation"
                description="Are you sure to delete?"
                onConfirm={() => deleteCollection()}
            >
                <Button
                    loading={loading}
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                >
                </Button>
            </Popconfirm>
        </>
    )
}

export default DeleteCollection
