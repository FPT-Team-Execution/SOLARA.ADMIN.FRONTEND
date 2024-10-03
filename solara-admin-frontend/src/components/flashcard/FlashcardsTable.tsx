import { ReloadOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { TableProps, Button, Table, Space } from "antd";
import { useState } from "react";
import { PageResModel, PageReqModel } from "../../types/general.type";
import { shortenString } from "../../utils/funcs/stringHelpers";
import { FlashcardModel } from "../../types/flashcard.type";
import { flashcardApi } from "../../utils/axios/flashcardApi";
import FlashcardDetails from "./FlashcardDetails";
import CreateFlashcard from "./CreateFlashcard";
import DeleteFlashcard from "./DeleteFlashcard";
import EditFlashcard from "./EditFlashcard";

interface IProps {
  collectionId: string
}

const FlashcardsTable = (props: IProps) => {
  const [flashcards, setFlashcards] = useState<FlashcardModel[] | undefined>([])
  const [selectedFlashcard, setSelectedFlashcard] = useState<FlashcardModel | null>(null);
  const [page, setPage] = useState<PageResModel>();
  const [query, setQuery] = useState<PageReqModel>({
    page: 1,
    pageSize: 50,
    sort: ""
  });

  const { loading, refresh } = useRequest(async () => {
    const response = await flashcardApi.getOnCollection(props.collectionId, query);
    setSelectedFlashcard(null)
    setFlashcards(response.responseRequest?.content)
    setPage(response.responseRequest?.page)
  }, {})

  const columns: TableProps<FlashcardModel>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'flashcardId',
      key: 'flashcardId',
      render: (flashcardId) => shortenString(flashcardId)
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: FlashcardModel) => (
        <Space size="small">
          <EditFlashcard></EditFlashcard>
          <DeleteFlashcard handleReloadTable={refresh} flashcardId={record.flashcardId}></DeleteFlashcard>
        </Space>
      ),
    },
  ];

  // Row selection configuration

  // Handle row click
  const handleRowClick = (record: FlashcardModel) => {
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
      <div>
        <div className="flex space-x-8 p-4">
          <h1>Page Number: {page?.number}</h1>
          <h1>Page Size: {page?.size}</h1>
          <h1>Total Elements: {page?.totalElements}</h1>
          <h1>Total Pages: {page?.totalPages}</h1>
        </div>

        <div className='flex w-full space-x-4'>
          <div className='w-5/12'>
            <Table
              loading={loading}
              className="shadow"
              dataSource={flashcards}
              columns={columns}
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
