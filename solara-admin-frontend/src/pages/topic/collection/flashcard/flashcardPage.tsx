import { useNavigate, useSearchParams } from "react-router-dom"
import FlashcardsTable from "../../../../components/flashcard/FlashcardsTable"
import { useEffect } from "react";
import { PATH_ADMIN } from "../../../../routes/path";

const FlashcardPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const collectionId = searchParams.get('collectionId');

  useEffect(() => {
    if (!collectionId) { 
      navigate(PATH_ADMIN.collection);
    }
  }, [collectionId, navigate]);

  return (
    <div>
      <FlashcardsTable collectionId={collectionId!}></FlashcardsTable>
    </div>
  )
}

export default FlashcardPage
