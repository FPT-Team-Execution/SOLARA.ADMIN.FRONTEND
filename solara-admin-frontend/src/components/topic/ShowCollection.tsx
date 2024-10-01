import { SettingOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { PATH_ADMIN } from '../../routes/path'

interface IProps {
    topicId: string
}

const ShowCollection = (props: IProps) => {
    return (
        <>
            <Link to={`${PATH_ADMIN.collection}?topicId=${props.topicId}`} >
                <Button type="default" icon={<SettingOutlined />}>
                </Button>
            </Link >
        </>
    )
}

export default ShowCollection
