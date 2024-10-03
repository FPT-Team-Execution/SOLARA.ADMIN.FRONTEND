import { useState } from "react";
import { TopicModel } from "../../types/topic.type.ts";
import { PageReqModel, PageResModel } from "../../types/general.type.ts";
import { useRequest } from "ahooks";
import { topicApi } from "../../utils/axios/topicApi.ts";
import { Button, Space, Table, TableProps } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { shortenString } from "../../utils/funcs/stringHelpers.ts";
import DeleteTopic from "./DeleteTopic.tsx";
import EditTopic from "./EditTopic.tsx";
import { formatDateTime } from "../../utils/funcs/datetimeHelper.ts";
import CreateTopic from "./CreateTopic.tsx";
import ShowCollection from "./ShowCollection.tsx";



const TopicsTable = () => {

    const [topics, setTopics] = useState<TopicModel[] | undefined>([])
    const [page, setPage] = useState<PageResModel>();
    const [query, setQuery] = useState<PageReqModel>({
        page: 1,
        pageSize: 100,
        sort: ""
    });

    const { loading, refresh } = useRequest(async () => {
        const response = await topicApi.getTopics(query);
        setTopics(response.responseRequest?.content)
        setPage(response.responseRequest?.page)
    }, {})

    const columns: TableProps<TopicModel>['columns'] = [
        // {
        //     title: 'Id',
        //     dataIndex: 'topicId',
        //     key: 'topicId',
        //     render: (topicId) => shortenString(topicId)
        // },
        {
            title: 'Name',
            dataIndex: 'topicName',
            key: 'topicName',
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
            render: (record: TopicModel) => (
                <Space size="small">
                    <ShowCollection topicId={record.topicId}></ShowCollection>
                    <EditTopic topic={record} handleReloadTable={refresh}></EditTopic>
                    <DeleteTopic handleReloadTable={refresh} id={record.topicId}></DeleteTopic>
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
                <CreateTopic handleReloadTable={refresh}></CreateTopic>
            </div>
            <div>
                {/* <div className="flex space-x-8 p-4">
                    <h1>Page Number: {page?.number}</h1>
                    <h1>Page Size: {page?.size}</h1>
                    <h1>Total Elements: {page?.totalElements}</h1>
                    <h1>Total Pages: {page?.totalPages}</h1>
                </div> */}
                <Table loading={loading} className="shadow" dataSource={topics} columns={columns} />
            </div>
        </div>
    );
};

export default TopicsTable;