export interface LearningPackage {
  id: string;
  name: string;
  description: string;
  isValid: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLearningPackageRequest {
  name: string;
  description: string;
}

export interface UpdateLearningPackageRequest {
  name: string;
  description: string;
} 