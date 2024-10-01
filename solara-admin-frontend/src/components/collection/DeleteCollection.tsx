import { DeleteOutlined } from "@ant-design/icons"
import { Button, Popconfirm } from "antd"

const DeleteCollection = () => {
    return (
        <>
            <Popconfirm
                className={'bg-red-600'}
                title="Confirmation"
                description="Are you sure to delete?"
                onConfirm={() => { }}
            >
                <Button

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
