import {useState} from "react";
import {TopicResModel} from "../../types/topic.type.ts";
import {PageReqModel} from "../../types/general.type.ts";
import {useRequest} from "ahooks";
import {topicApi} from "../../utils/axios/topicApi.ts";
import CreateTopic from "./CreateTopic.tsx";

const TopicsTable = () => {

    const [topics, setTopics] = useState<TopicResModel[] | undefined>([])
    const [reload, setReload] = useState<boolean>(false);
    const [query, setQuery] = useState<PageReqModel>({
        page: 1,
        pageSize: 1,
        sort: ""
    });

    const handleReloadTable = () => {
        setReload(pre => !pre);
    }

    useRequest(async () => {
            const response = await topicApi.getTopics(query);
            setTopics(response.responseRequest?.payload.content)
        }, {
            refreshDeps: [reload]
        }
    )

    return (
        <div>
            <CreateTopic handleReloadTable={handleReloadTable}></CreateTopic>
            {
                topics?.map((topic, index) => {
                    return (
                        <>
                            <h1>{index}</h1>
                            <h2>{topic.topicName}</h2>
                        </>
                    )
                })
            }
        </div>
    );
};

export default TopicsTable;