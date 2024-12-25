import { Card } from 'antd';
import AppBreadcrumb from '../../../../../components/general/AppBreadcrumb';
import ExerciseTypeTable from '../../../../../components/exerciseType/ExerciseTypeTable';
import { PATH_ADMIN } from '../../../../../routes/path';

const ExerciseTypePage = () => {
  const breadcrumbItems = [
    { title: 'Dashboard', link: PATH_ADMIN.root },
    { title: 'Exercise Types' },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <AppBreadcrumb items={breadcrumbItems} />
      </div>
      
      <Card title="Exercise Types Management">
        <ExerciseTypeTable />
      </Card>
    </div>
  );
};

export default ExerciseTypePage; 