import { DeleteOutlined } from "@ant-design/icons"
import { Button, Popconfirm } from "antd"
import { collectionApi } from "../../utils/axios/collectionApi"
import { useRequest } from "ahooks"

interface IProps {
    id: string,
    handleReloadTable: () => void
}

const DeleteCollection = (props: IProps) => {

    const { loading, run: deleteCollection } = useRequest(async () => {
        const response = await collectionApi.deleteCollection(props.id)
        if (response.isSuccess == true) {
            props.handleReloadTable()
        }
    }, {
        manual: true
    })

    return (
        <>
            <Popconfirm
                className={'bg-red-600'}
                title="Confirmation"
                description="Are you sure to delete?"
                onConfirm={() => deleteCollection()}
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
        </>
    )
}

export default DeleteCollection
