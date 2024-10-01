import { useState } from "react";
import { TopicModel } from "../../types/topic.type.ts";
import { PageReqModel } from "../../types/general.type.ts";
import { useRequest } from "ahooks";
import { topicApi } from "../../utils/axios/topicApi.ts";
import { Button, Space, Table, TableProps } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { shortenString } from "../../utils/funcs/stringHelpers.ts";
import DeleteTopic from "./DeleteTopic.tsx";
import EditTopic from "./EditTopic.tsx";
import { formatDateTime } from "../../utils/funcs/datetimeHelper.ts";
import CreateTopic from "./CreateTopic.tsx";



const TopicsTable = () => {

    const [topics, setTopics] = useState<TopicModel[] | undefined>([])
    const [reload, setReload] = useState<boolean>(false);
    const [query, setQuery] = useState<PageReqModel>({
        page: 1,
        pageSize: 10,
        sort: ""
    });

    const handleReloadTable = () => {
        setReload(pre => !pre);
    }

    const { loading } = useRequest(async () => {
        const response = await topicApi.getTopics(query);
        setTopics(response.responseRequest?.content)
    }, {
        refreshDeps: [reload]
    })

    const columns: TableProps<TopicModel>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'topicId',
            key: 'topicId',
            render: (topicId) => shortenString(topicId)
        },
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
                    <EditTopic topic={record} handleReloadTable={handleReloadTable}></EditTopic>
                    <DeleteTopic handleReloadTable={handleReloadTable} id={record.topicId}></DeleteTopic>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex float-end space-x-2 p-4">
                <Button type="default" onClick={handleReloadTable}>
                    <ReloadOutlined /> Reload
                </Button>
                <CreateTopic handleReloadTable={handleReloadTable}></CreateTopic>
            </div>
            <div>
                <Table loading={loading} className="shadow" dataSource={topics} columns={columns} key={"d"} />
            </div>
        </div>
    );
};

export default TopicsTable;