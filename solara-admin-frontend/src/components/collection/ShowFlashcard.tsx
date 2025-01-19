import { FolderOpenOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PATH_ADMIN } from '../../routes/path'

interface IProps {
  id: string;
  topicId: string;
}

const ShowFlashcard = (props: IProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${PATH_ADMIN.exercise}/${props.topicId}/${props.id}`)
  }

  return (
    <Button 
      type="default" 
      icon={<FolderOpenOutlined />}
      onClick={handleClick}
    />
  )
}

export default ShowFlashcard
