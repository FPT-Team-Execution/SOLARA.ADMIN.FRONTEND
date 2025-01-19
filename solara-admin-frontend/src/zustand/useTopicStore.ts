import axiosClient from '../utils/axios/axiosClient';
import { CreateTopicRequest, GetPagedTopicsRequest, TopicDto, UpdateTopicRequest } from './../types/topic';
import { create } from 'zustand';
import { DELETE_TOPIC_API, GET_TOPIC_API, GET_TOPICS_API, POST_TOPIC_API, PUT_TOPIC_API } from '../constants/apis';
import { IBaseModel, IPaginate } from '../types/general.type';

interface TopicStore {
    topic: TopicDto | null
    topics: IPaginate<TopicDto> | null;
    getTopics: (query: GetPagedTopicsRequest) => Promise<void>;
    getTopic: (id: string) => Promise<void>;
    createTopic: (request: CreateTopicRequest) => Promise<void>;
    updateTopic: (request: UpdateTopicRequest) => Promise<void>;
    deleteTopic: (id: string) => Promise<void>;
}

const useTopicStore = create<TopicStore>((set) => ({
    topic: null,
    topics: null,

    // Get a list of topics with pagination
    getTopics: async (query: GetPagedTopicsRequest) => {
        try {

            const response = await axiosClient.get<IBaseModel<IPaginate<TopicDto>>>(GET_TOPICS_API, { params: query });
            console.log(response);
            if (!response.data.isSuccess) {
                return
            }

            set((state) => ({
                ...state,
                topics: response.data.responseRequest,
            }));

        } catch (error) {
            console.error('Error fetching topics', error);
        }
    },

    // Get a single topic by its ID
    getTopic: async (id: string) => {
        try {

            const response = await axiosClient.get<IBaseModel<TopicDto>>(GET_TOPIC_API(id));

            if (!response.data.isSuccess) {
                return;
            }

            set((state) => ({
                ...state,
                topic: response.data.responseRequest,
            }));

        } catch (error) {
            console.error('Error fetching topic', error);
        }
    },

    // Create a new topic
    createTopic: async (request: CreateTopicRequest) => {
        try {

            const createResponse = await axiosClient.post<IBaseModel<string>>(POST_TOPIC_API, request);

            const topicId = createResponse.data.responseRequest;

            const getResponse = await axiosClient.get<IBaseModel<TopicDto>>(GET_TOPIC_API(topicId!));

            const topic = getResponse.data.responseRequest;

            if (topic) {
                set((state) => {
                    const updatedTopics = state.topics
                        ?
                        {
                            ...state.topics,
                            items: [...state.topics.items, topic],
                            total: state.topics.total + 1,
                            totalPages: Math.ceil((state.topics.total + 1) / state.topics.size),
                        }
                        :
                        {
                            items: [topic],
                            size: 1,
                            page: 1,
                            total: 1,
                            totalPages: 1
                        };

                    return { topics: updatedTopics };
                });
            }

        } catch (error) {
            console.error('Error creating topic', error);
        }
    },

    // Update an existing topic
    updateTopic: async (request: UpdateTopicRequest) => {
        try {
            const response = await axiosClient.put<IBaseModel<TopicDto>>(PUT_TOPIC_API, request);

            if (!response.data.isSuccess) {
                return
            }

            set((state) => {
                // Check if topics are available
                if (!state.topics) {
                    return {
                        topics: state.topics
                    };
                }

                // Update the topic in the items array
                const updatedTopics = state.topics.items.map((topic) =>
                    topic.topicId === response.data.responseRequest?.topicId
                        ? { ...topic, ...response.data.responseRequest } // Merge the updated topic
                        : topic
                );

                return {
                    topics: {
                        ...state.topics,
                        items: updatedTopics,
                    }
                };
            });

        } catch (error) {
            console.error('Error updating topic', error);
        }
    },

    // Delete a topic by its ID
    deleteTopic: async (id: string) => {
        try {

            const response = await axiosClient.delete<IBaseModel<null>>(DELETE_TOPIC_API(id));

            if (!response.data.isSuccess) {
                return;
            }

            set((state) => {

                if (!state.topics) {
                    return {
                        topics: state.topics
                    }
                }

                const updatedItems = state.topics.items.filter((topic) => topic.topicId !== id);
                const updatedTotal = state.topics.total - 1;
                const updatedTotalPages = Math.ceil(updatedTotal / state.topics.size);

                return {
                    topics: {
                        ...state.topics,
                        items: updatedItems,
                        total: updatedTotal,
                        totalPages: updatedTotalPages
                    }
                };
            });

        } catch (error) {
            console.error('Error deleting topic', error);
        }
    },

}));

export default useTopicStore;
