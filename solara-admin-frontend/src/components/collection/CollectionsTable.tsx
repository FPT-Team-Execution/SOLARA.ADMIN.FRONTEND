import { Button, Space, Table, TableProps } from "antd"
import { ReloadOutlined } from "@ant-design/icons"
import { formatDateTime } from "../../utils/funcs/datetimeHelper"
import DeleteCollection from "./DeleteCollection"
import EditCollection from "./EditCollection"
import ShowFlashcard from "./ShowFlashcard"
import AppTableQuery from "../general/AppTableQuery"
import { SubTopicDto } from "../../types/subTopic"
import { useCollectionStore } from "../../stores/collectionStore"
import { useEffect } from "react"
import CreateCollection from "./CreateCollection"
import { IPageRequest } from "../../types/general.type"

interface IProps {
    topicId: string,
}

const CollectionsTable = (props: IProps) => {
    const { collections, pagination, loading, query, setQuery, fetchCollections } = useCollectionStore()
    
    console.log('Collections:', collections) // Debug collections
    console.log('Pagination:', pagination) // Debug pagination

    useEffect(() => {
        console.log('TopicId:', props.topicId)
        if (props.topicId) {
            fetchCollections(props.topicId)
        }
    }, [query, props.topicId])

    const updateQuery = (key: keyof IPageRequest, value: string | number | boolean) => {
        setQuery({...query, [key]: value})
    }

    const columns: TableProps<SubTopicDto>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Created At',
            dataIndex: 'createdOn',
            key: 'createdOn',
            render: (datetime) => formatDateTime(datetime)
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: SubTopicDto) => (
                <Space size="small">
                    <ShowFlashcard 
                        id={record.id} 
                        topicId={props.topicId}
                    ></ShowFlashcard>
                    <EditCollection 
                        topicId={props.topicId} 
                        collection={record} 
                        handleReloadTable={() => fetchCollections(props.topicId)}
                    ></EditCollection>
                    <DeleteCollection 
                        id={record.id} 
                        handleReloadTable={() => fetchCollections(props.topicId)}
                    ></DeleteCollection>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <div className="flex float-end space-x-2 p-4">
                <Button type="dashed" onClick={() => fetchCollections(props.topicId)} icon={<ReloadOutlined />}>
                    Reload
                </Button>
                <CreateCollection topicId={props.topicId} handleReloadTable={() => fetchCollections(props.topicId)} />
            </div>

            <div className="flex float-start space-x-2 p-4">
                <AppTableQuery page={pagination} query={query} updateQuery={updateQuery} />
            </div>

            <div>
                <Table loading={loading} className="shadow" dataSource={collections} columns={columns} pagination={false} rowKey={(record) => record.id} />
            </div>
        </div>
    )
}

export default CollectionsTable