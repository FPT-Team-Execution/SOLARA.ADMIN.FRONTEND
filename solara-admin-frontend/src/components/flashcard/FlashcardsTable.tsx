import { ReloadOutlined, FileTextOutlined } from "@ant-design/icons";
import { TableProps, Button, Table, Space } from "antd";
import { useEffect } from "react";
import { ExerciseDto } from "../../types/exercise";
import { useFlashcardStore } from '../../stores/flashcardStore'
import FlashcardDetails from "./FlashcardDetails";
import CreateFlashcard from "./CreateFlashcard";
import DeleteFlashcard from "./DeleteFlashcard";
import EditFlashcard from "./EditFlashcard";
import AppTableQuery from "../general/AppTableQuery";
import ManageOptions from './ManageOptions';
import { useNavigate } from 'react-router-dom';
import { PATH_ADMIN } from '../../routes/path';

interface IProps {
  subTopicId: string;
}

const FlashcardsTable = ({ subTopicId }: IProps) => {
  const { 
    flashcards, 
    pagination, 
    loading, 
    query, 
    setQuery, 
    fetchFlashcards,
    setSelectedFlashcard,
    selectedFlashcard,
  } = useFlashcardStore()

  const navigate = useNavigate();

  useEffect(() => {
    console.log(subTopicId);
    if (subTopicId) {
      fetchFlashcards(subTopicId)
    }
  }, [query, subTopicId])

  const handleReload = () => {
    if (subTopicId) {
      fetchFlashcards(subTopicId)
    }
  }

  const columns: TableProps<ExerciseDto>['columns'] = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (_, __, index: number) => index + 1,
      width: '5%',
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      width: '40%',
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      width: '15%',
    },
    {
      title: 'XP',
      dataIndex: 'xp',
      key: 'xp',
      width: '10%',
    },
    {
      title: 'Type',
      dataIndex: 'exerciseTypeName',
      key: 'exerciseTypeName',
      width: '15%',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <ManageOptions 
            exerciseId={record.id} 
            options={record.answers || []}
            onOptionsUpdate={handleReload}
          />
          <EditFlashcard 
            handleReloadTable={() => handleReload()} 
            flashcard={record} 
          />
          <DeleteFlashcard 
            handleReloadTable={() => handleReload()} 
            flashcardId={record.id} 
          />
        </Space>
      ),
    },
  ];

  // Handle row click
  const handleRowClick = (record: ExerciseDto) => {
    setSelectedFlashcard(record);
  };

  return (
    <div>
      <div className="flex float-end space-x-2 p-4">
        <Button 
          type="primary"
          onClick={() => navigate('/exercise-types')}
          icon={<FileTextOutlined />}
        >
          Exercise Types
        </Button>
        <Button type="dashed" onClick={handleReload} icon={<ReloadOutlined />}>
          Reload
        </Button>
        <CreateFlashcard 
          subTopicId={subTopicId || ''}
          handleReloadTable={handleReload}
        />
      </div>

      <div className="flex float-start space-x-2 p-4">
        <AppTableQuery 
          page={pagination} 
          query={query} 
          updateQuery={(key, value) => setQuery({...query, [key]: value})}
        />
      </div>

      <div>
        <div className='flex w-full space-x-4'>
          <div className='w-5/12'>
            <Table
              loading={loading}
              className="shadow"
              dataSource={flashcards}
              columns={columns}
              pagination={false}
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
                style: { cursor: 'pointer' }
              })} 
            />
          </div>

          <div className="w-7/12">
            <FlashcardDetails 
              handleReloadTable={handleReload} 
              flashcard={selectedFlashcard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsTable
