import { useState, useEffect } from 'react';
import { message } from 'antd';
import { LearningPackage } from '../../types/learningPackage.type';
import { learningPackageApi } from '../../utils/axios/learningPackageApi';
import CreateLearningPackage from '../../components/learningPackage/CreateLearningPackage';
import EditLearningPackage from '../../components/learningPackage/EditLearningPackage';
import LearningPackageTable from '../../components/learningPackage/LearningPackageTable';

const LearningPackagePage = () => {
  const [packages, setPackages] = useState<LearningPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<LearningPackage | null>(null);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await learningPackageApi.getLearningPackages();
      if (response.isSuccess) {
        setPackages(response.data);
      }
    } catch {
      message.error('Failed to fetch learning packages');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleEdit = (pkg: LearningPackage) => {
    setSelectedPackage(pkg);
    setEditModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <CreateLearningPackage onSuccess={fetchPackages} />
      </div>
      
      <LearningPackageTable
        data={packages}
        loading={loading}
        onEdit={handleEdit}
        onRefresh={fetchPackages}
      />

      {selectedPackage && (
        <EditLearningPackage
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedPackage(null);
          }}
          onSuccess={fetchPackages}
          package={selectedPackage}
        />
      )}
    </div>
  );
};

export default LearningPackagePage; 