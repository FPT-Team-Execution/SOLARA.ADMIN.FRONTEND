import { useState } from "react";
import { TopicModel } from "../../types/topic.type.ts";
import { PageReqModel } from "../../types/general.type.ts";
import { useRequest } from "ahooks";
import { topicApi } from "../../utils/axios/topicApi.ts";
import CreateTopic from "./CreateTopic.tsx";
import { Button, Space, Table, TableProps } from "antd";
import { EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";



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
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: TopicModel) => (
                <Space size="middle">
                    <Button type="dashed">
                        <EditOutlined /> Edit
                    </Button>
                    <Button className="bg-red-600" type="primary" onClick={() => topicApi.deleteTopic(record.topicId)}>
                        <DeleteOutlined /> Delete
                    </Button>
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
                <Table loading={loading} className="shadow" dataSource={topics} columns={columns} />;
            </div>
        </div>
    );
};

export default TopicsTable;