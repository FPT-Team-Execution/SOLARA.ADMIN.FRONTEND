export interface ExerciseType {
  id: string;
  name: string;
  description: string;
}

export interface CreateExerciseTypeRequest {
  name: string;
  description: string;
}

export interface UpdateExerciseTypeRequest extends CreateExerciseTypeRequest {
  id: string;
} 