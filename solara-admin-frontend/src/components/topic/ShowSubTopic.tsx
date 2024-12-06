import { FolderOpenOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { PATH_ADMIN } from '../../routes/path'

interface IProps {
    topicId: string
}

const ShowSubTopic = (props: IProps) => {
    return (
        <>
            <Link to={`${PATH_ADMIN.subTopics}?topicId=${props.topicId}`} >
                <Button type="default" icon={<FolderOpenOutlined />}>
                </Button>
            </Link >
        </>
    )
}

export default ShowSubTopic
