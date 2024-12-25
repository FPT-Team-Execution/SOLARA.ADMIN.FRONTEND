import { useNavigate, useParams } from "react-router-dom"
import FlashcardsTable from "../../../../components/flashcard/FlashcardsTable"
import { useEffect } from "react";
import { PATH_ADMIN } from "../../../../routes/path";

const FlashcardPage = () => {
  const { topicId, subTopicId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!topicId || !subTopicId) {
      navigate(PATH_ADMIN.topic);
    }
  }, [topicId, subTopicId, navigate]);

  return (
    <div>
      <FlashcardsTable subTopicId={subTopicId!}></FlashcardsTable>
    </div>
  )
}

export default FlashcardPage
