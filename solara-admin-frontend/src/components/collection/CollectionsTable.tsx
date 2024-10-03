import { useState } from "react"
import CreateCollection from "./CreateCollection"
import { CollectionModel } from "../../types/collection.type"
import { PageReqModel, PageResModel } from "../../types/general.type"
import { useRequest } from "ahooks"
import { collectionApi } from "../../utils/axios/collectionApi"
import { Button, Space, Table, TableProps } from "antd"
// import { shortenString } from "../../utils/funcs/stringHelpers"
import { formatDateTime } from "../../utils/funcs/datetimeHelper"
import DeleteCollection from "./DeleteCollection"
import EditCollection from "./EditCollection"
import ShowFlashcard from "./ShowFlashcard"
import { ReloadOutlined } from "@ant-design/icons"
import AppTableQuery from "../general/AppTableQuery"

interface IProps {
    topicId: string
}

const CollectionsTable = (props: IProps) => {

    const [collections, setCollections] = useState<CollectionModel[] | undefined>([]);
    const [page, setPage] = useState<PageResModel>();
    const [query, setQuery] = useState<PageReqModel>({
        page: 1,
        pageSize: 10,
        sort: ""
    });

    const updateQuery = (key: keyof PageReqModel, value: string | number) => {
        setQuery((prevQuery) => ({
            ...prevQuery,
            [key]: value,
        }));
    };

    const { loading, refresh } = useRequest(async () => {
        const response = await collectionApi.getOnTopic(props.topicId, query);
        setCollections(response.responseRequest?.content);
        setPage(response.responseRequest?.page);
    }, {
        refreshDeps: [query]
    })

    const columns: TableProps<CollectionModel>['columns'] = [
        // {
        //     title: 'Id',
        //     dataIndex: 'collectionId',
        //     key: 'collectionId',
        //     render: (collectionId) => shortenString(collectionId)
        // },
        {
            title: 'Name',
            dataIndex: 'collectionName',
            key: 'collectionName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Created At',
            dataIndex: 'createAt',
            key: 'createAt',
            render: (datetime) => formatDateTime(datetime)
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: CollectionModel) => (
                <Space size="small">
                    <ShowFlashcard collectionId={record.collectionId}></ShowFlashcard>
                    <EditCollection topicId={props.topicId} collection={record} handleReloadTable={refresh}></EditCollection>
                    <DeleteCollection id={record.collectionId} handleReloadTable={refresh}></DeleteCollection>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex float-end space-x-2 p-4">
                <Button type="dashed" onClick={refresh} icon={<ReloadOutlined />}>
                    Reload
                </Button>
                <CreateCollection topicId={props.topicId} handleReloadTable={refresh} ></CreateCollection>
            </div>

            <div className="flex float-start space-x-2 p-4">
                <AppTableQuery page={page} query={query} updateQuery={updateQuery}></AppTableQuery>
            </div>

            <div>
                <Table loading={loading} className="shadow" dataSource={collections} columns={columns} pagination={false} />
            </div>
        </div>
    )
}

export default CollectionsTable