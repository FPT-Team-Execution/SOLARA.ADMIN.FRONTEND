import { DeleteOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Popconfirm } from 'antd'
import { flashcardApi } from '../../utils/axios/flashcardApi'

interface IProps {
  flashcardId: string | undefined
  handleReloadTable: () => void
}

const DeleteFlashcard = (props: IProps) => {

  const { loading, run: deleteFlashcard } = useRequest(async () => {
    const response = await flashcardApi.deleteFlashcard(props.flashcardId!)
    if (response.isSuccess == true) {
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
        onConfirm={() => deleteFlashcard()}

      >
        <Button
          loading={loading}
          type="primary"
          icon={<DeleteOutlined />}
          danger
        >
        </Button>
      </Popconfirm>
    </>
  )
}

export default DeleteFlashcard
