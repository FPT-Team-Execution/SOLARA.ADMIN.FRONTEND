import axiosInstance from './axiosInstance';
import { CreateExerciseTypeRequest, UpdateExerciseTypeRequest } from "../../types/exerciseType";

export const exerciseTypeApi = {
  getExerciseTypes: async () => {
    const response = await axiosInstance.get('/api/v1/exercise-types');
    return response.data;
  },

  getExerciseType: async (id: string) => {
    const response = await axiosInstance.get(`/api/v1/exercise-types/${id}`);
    return response.data;
  },

  createExerciseType: async (data: CreateExerciseTypeRequest) => {
    const response = await axiosInstance.post('/api/v1/exercise-types', data);
    return response.data;
  },

  updateExerciseType: async (id: string, data: UpdateExerciseTypeRequest) => {
    const response = await axiosInstance.put(`/api/v1/exercise-types/${id}`, data);
    return response.data;
  },

  deleteExerciseType: async (id: string) => {
    const response = await axiosInstance.delete(`/api/v1/exercise-types/${id}`);
    return response.data;
  }
}; 