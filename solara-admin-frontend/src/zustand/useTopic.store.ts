import { create } from 'zustand';
import { TopicModel, UpsertTopicReqModel, TopicResModel } from '../types/topic.type';
import { PageReqModel, PageResModel } from '../types/general.type';

type State = {
    topics: TopicModel[];
    topic: TopicResModel | null;
    page : PageResModel | null;
    loading: boolean;
};

type Action = {
    getTopics: (query: PageReqModel) => Promise<void>;
    getTopic: (id: string) => Promise<void>;
    createTopic: (request: UpsertTopicReqModel) => Promise<void>;
    updateTopic: (id: string, request: UpsertTopicReqModel) => Promise<void>;
    deleteTopic: (id: string) => Promise<void>;
};

// Zustand store for topics
const useTopicStore = create<State & Action>((set) => ({
    page: null,
    topics: [],
    topic: null,
    loading: false,

    getTopics: async (query: PageReqModel) => {
        set({ loading: true });
    
    },

    getTopic: async (id: string) => {
        set({ loading: true });
    
    },

    createTopic: async (request: UpsertTopicReqModel) => {
        set({ loading: true });

    },

    updateTopic: async (id: string, request: UpsertTopicReqModel) => {
        set({ loading: true });

    },

    deleteTopic: async (id: string) => {
        set({ loading: true });

    },
}));

export default useTopicStore;
