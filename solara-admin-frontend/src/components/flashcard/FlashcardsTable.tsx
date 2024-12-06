import { ReloadOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { TableProps, Button, Table, Space } from "antd";
import { useState } from "react";
import { IPaginate, IPageRequest } from "../../types/general.type";
import { flashcardApi } from "../../utils/axios/flashcardApi";
import FlashcardDetails from "./FlashcardDetails";
import CreateFlashcard from "./CreateFlashcard";
import DeleteFlashcard from "./DeleteFlashcard";
// import EditFlashcard from "./EditFlashcard";
import AppTableQuery from "../general/AppTableQuery";
import {ExerciseDto} from "../../types/exercise";
interface IProps {
  collectionId: string
}

const FlashcardsTable = (props: IProps) => {
  const [flashcards, setFlashcards] = useState<ExerciseDto[] | undefined>([])
  const [selectedFlashcard, setSelectedFlashcard] = useState<ExerciseDto | null>(null);
  const [page, setPage] = useState<IPaginate<ExerciseDto>>();
  const [query, setQuery] = useState<IPageRequest>({
    page: 1,
    size: 10,
    isAscending: false
  });

  const updateQuery = (key: keyof IPageRequest, value: string | number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [key]: value,
    }));
  };

  const { loading, refresh } = useRequest(async () => {
    const response = await flashcardApi.getOnCollection(props.collectionId, query);
    console.log("XXX");
    setSelectedFlashcard(null)
    setFlashcards(response.responseRequest?.items)
    setPage(response.responseRequest)
  }, {
    refreshDeps: [query]
  })

  const columns: TableProps<ExerciseDto>['columns'] = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (_, __, index: number) => index + 1,
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: ExerciseDto) => (
        <Space size="small">
          {/* <EditFlashcard handleReloadTable={refresh} flashcard={record}></EditFlashcard> */}
          <DeleteFlashcard handleReloadTable={refresh} flashcardId={record.id}></DeleteFlashcard>
        </Space>
      ),
    },
  ];

  // Row selection configuration

  // Handle row click
  const handleRowClick = (record: ExerciseDto) => {
    setSelectedFlashcard(record); // Set the selected flashcard to display details
  };

  return (
    <div>
      <div className="flex float-end space-x-2 p-4">
        <Button type="dashed" onClick={refresh} icon={<ReloadOutlined />}>
          Reload
        </Button>
        <CreateFlashcard collectionId={props.collectionId} handleReloadTable={refresh}></CreateFlashcard>
      </div>

      <div className="flex float-start space-x-2 p-4">
        <AppTableQuery page={page} query={query} updateQuery={updateQuery}></AppTableQuery>
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
              })} />
          </div>

          <div className="w-7/12">
            <FlashcardDetails handleReloadTable={refresh} flashcard={selectedFlashcard}></FlashcardDetails>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FlashcardsTable
