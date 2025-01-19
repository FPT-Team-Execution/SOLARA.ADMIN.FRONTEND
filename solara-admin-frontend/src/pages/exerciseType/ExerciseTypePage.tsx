import { Card } from 'antd';
import ExerciseTypeTable from '../../components/exerciseType/ExerciseTypeTable';

const ExerciseTypePage = () => {
  return (
    <div className="p-4">
      <Card title="Exercise Types Management">
        <ExerciseTypeTable />
      </Card>
    </div>
  );
};

export default ExerciseTypePage; 