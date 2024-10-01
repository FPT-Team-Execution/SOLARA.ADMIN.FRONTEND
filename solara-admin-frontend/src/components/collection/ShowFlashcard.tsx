import { FolderOpenOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { PATH_ADMIN } from '../../routes/path'

interface IProps {
  collectionId: string;
}

const ShowFlashcard = (props: IProps) => {
  return (
    <>
      <Link to={`${PATH_ADMIN.flashcard}?collectionId=${props.collectionId}`} >
        <Button type="default" icon={<FolderOpenOutlined />}>
        </Button>
      </Link >
    </>
  )
}

export default ShowFlashcard
