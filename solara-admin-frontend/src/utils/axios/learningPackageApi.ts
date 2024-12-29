import axiosInstance  from './axiosInstance';
import { ApiResponse } from '../../types/general.type';
import { CreateLearningPackageRequest, LearningPackage, UpdateLearningPackageRequest } from '../../types/learningPackage.type';

const BASE_URL = '/api/v1/learning-packages';

export const learningPackageApi = {
  getLearningPackages: async (): Promise<ApiResponse<LearningPackage[]>> => {
    const response = await axiosInstance.get(BASE_URL);
    return response.data;
  },

  getLearningPackage: async (id: string): Promise<ApiResponse<LearningPackage>> => {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  createLearningPackage: async (data: CreateLearningPackageRequest): Promise<ApiResponse<LearningPackage>> => {
    const response = await axiosInstance.post(BASE_URL, data);
    return response.data;
  },

  updateLearningPackage: async (id: string, data: UpdateLearningPackageRequest): Promise<ApiResponse<LearningPackage>> => {
    const response = await axiosInstance.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  updatePackageValidity: async (id: string, isValid: boolean): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.patch(`${BASE_URL}/${id}/target/is-valid`, { isValid });
    return response.data;
  },
}; 