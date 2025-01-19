import { create } from 'zustand'
import { SubTopicDto, UpdateSubTopicRequest } from '../types/subTopic'
import { collectionApi } from '../utils/axios/collectionApi'
import { IPageRequest, IPaginate } from '../types/general.type'

interface CollectionState {
  collections: SubTopicDto[]
  pagination: IPaginate<SubTopicDto> | undefined
  loading: boolean
  query: IPageRequest
  setQuery: (query: IPageRequest) => void
  fetchCollections: (topicId: string) => Promise<void>
  createCollection: (request: UpdateSubTopicRequest) => Promise<boolean>
  updateCollection: (id: string, request: UpdateSubTopicRequest) => Promise<boolean>
  deleteCollection: (id: string) => Promise<boolean>
}

export const useCollectionStore = create<CollectionState>((set, get) => ({
  collections: [],
  pagination: undefined,
  loading: false,
  query: {
    page: 1,
    size: 10,
    isAscending: false,
  },
  setQuery: (query) => set({ query }),
  
  fetchCollections: async (topicId: string) => {
    set({ loading: true })
    try {
      const response = await collectionApi.getOnTopic(topicId, get().query)
      console.log('Store Response:', response)
      
      if (response && response.responseRequest) {
        set({
          collections: response.responseRequest.items || [],
          pagination: {
            total: response.responseRequest.total || 0,
            totalPages: response.responseRequest.totalPages || 0,
            items: response.responseRequest.items || [],
            size: get().query.size,
            page: get().query.page
          },
          loading: false
        })
      } else {
        console.error('Invalid response structure:', response)
        set({ 
          collections: [],
          loading: false 
        })
      }
    } catch (error) {
      console.error('Error fetching collections:', error)
      set({ 
        collections: [],
        loading: false 
      })
    }
  },

  createCollection: async (request) => {
    try {
      const response = await collectionApi.postCollection(request)
      return response.isSuccess
    } catch (error) {
      console.error('Error creating collection:', error)
      return false
    }
  },

  updateCollection: async (id, request) => {
    try {
      const response = await collectionApi.putCollection(id, request)
      return response.isSuccess
    } catch (error) {
      console.error('Error updating collection:', error)
      return false
    }
  },

  deleteCollection: async (id) => {
    try {
      const response = await collectionApi.deleteCollection(id)
      return response.isSuccess
    } catch (error) {
      console.error('Error deleting collection:', error)
      return false
    }
  },
})) 