import {useState} from "react";
import {TopicModel} from "../../../types/topic.type.ts";
import {PageReqModel} from "../../../types/general.type.ts";
import {useRequest} from "ahooks";
import {topicApi} from "../../../utils/axios/topicApi.ts";

const TopicsTable = () => {

    const [topics, setTopics] = useState<TopicModel[] | undefined>([])
    const [query, setQuery] = useState<PageReqModel>({
        page: 1,
        pageSize: 1,
        sort: " "
    });

    useRequest(async () => {
            const response = await topicApi.getTopics(query);
            setTopics(response.responseRequest?.payload.content)
        }
    )

    return (
        <div>
        </div>
    );
};

export default TopicsTable;