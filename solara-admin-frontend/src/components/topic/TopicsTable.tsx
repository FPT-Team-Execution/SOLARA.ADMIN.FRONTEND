import { useState } from "react";
import { TopicDto } from "../../types/topic.type.ts";
import { IPageRequest, IPaginate } from "../../types/general.type.ts";
import { useRequest } from "ahooks";
import { topicApi } from "../../utils/axios/topicApi.ts";
import { Button, Space, Table, TableProps } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
// import { shortenString } from "../../utils/funcs/stringHelpers.ts";
import DeleteTopic from "./DeleteTopic.tsx";
import EditTopic from "./EditTopic.tsx";
import { formatDateTime } from "../../utils/funcs/datetimeHelper.ts";
import CreateTopic from "./CreateTopic.tsx";
import ShowSubTopic from "./ShowSubTopic.tsx";
import AppTableQuery from "../general/AppTableQuery.tsx";



const TopicsTable = () => {

    const [topics, setTopics] = useState<TopicDto[] | undefined>([])
    const [page, setPage] = useState<IPaginate<TopicDto> | undefined>();
    const [query, setQuery] = useState<IPageRequest>({
        page: 1,
        size: 10,
        isAscending: false,
    });

    const updateQuery = (key: keyof IPageRequest, value: string | number) => {
        setQuery((prevQuery) => ({
            ...prevQuery,
            [key]: value,
        }));
    };

    const { loading, refresh } = useRequest(async () => {
        const response = await topicApi.getTopics(query);
        setTopics(response.responseRequest?.items)
        setPage(response.responseRequest);
    }, {
        refreshDeps: [query]
    })

    const columns: TableProps<TopicDto>['columns'] = [
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
            dataIndex: 'createdOn',
            key: 'createdOn',
            render: (datetime) => formatDateTime(datetime)
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: TopicDto) => (
                <Space size="small">
                    <ShowSubTopic topicId={record.topicId}></ShowSubTopic>
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

            <div className="flex float-start space-x-2 p-4">
                <AppTableQuery page={page} query={query} updateQuery={updateQuery}></AppTableQuery>
            </div>

            <div>
                <Table loading={loading} className="shadow" dataSource={topics} columns={columns} pagination={false} />
            </div>

        </div>
    );
};

export default TopicsTable;