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
  }, [query, subTopicId, fetchFlashcards])

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
            options={record.ans || []}
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
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="order-2 sm:order-1">
          <AppTableQuery 
            page={pagination} 
            query={query} 
            updateQuery={(key, value) => setQuery({...query, [key]: value})}
          />
        </div>

        <div className="flex flex-wrap gap-2 order-1 sm:order-2">
          <Button 
            type="primary"
            onClick={() => navigate('/exercise-types')}
            icon={<FileTextOutlined />}
            className="hover:scale-105 transition-transform"
          >
            Exercise Types
          </Button>
          <Button 
            type="dashed" 
            onClick={handleReload} 
            icon={<ReloadOutlined />}
            className="hover:scale-105 transition-transform"
          >
            Reload
          </Button>
          <CreateFlashcard 
            subTopicId={subTopicId || ''}
            handleReloadTable={handleReload}
          />
        </div>
      </div>

      <div>
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='w-full lg:w-8/12'>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Table
                loading={loading}
                dataSource={flashcards}
                columns={columns}
                pagination={false}
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                  style: { 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  },
                  className: 'hover:bg-gray-50'
                })}
                scroll={{ x: 'max-content' }}
              />
            </div>
          </div>

          <div className="w-full lg:w-4/12">
            <div className="bg-white rounded-lg shadow-md p-4">
              <FlashcardDetails 
                handleReloadTable={handleReload} 
                flashcard={selectedFlashcard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsTable
