import { Card } from "antd"
import EditFlashcard from "./EditFlashcard";
import { FlashcardModel } from "../../types/flashcard.type";
import DeleteFlashcard from "./DeleteFlashcard";

interface IProps {
    flashcard: FlashcardModel | null
    handleReloadTable: () => void
}

const FlashcardDetails = (props: IProps) => {


    const actions: React.ReactNode[] = [
        <EditFlashcard></EditFlashcard>,
        <DeleteFlashcard
            handleReloadTable={props.handleReloadTable}
            flashcardId={props.flashcard?.flashcardId}
        >
        </DeleteFlashcard>,
    ];



    return (
        <>
            <Card actions={actions} >
                <Card.Meta
                    title="Card title"
                    description={
                        <>
                            <p>{props.flashcard?.flashcardId}</p>
                            <p>{props.flashcard?.question}</p>
                            <p>{props.flashcard?.answer}</p>
                            <p>{props.flashcard?.difficulty}</p>
                            <p>{props.flashcard?.imageUrl}</p>
                            <p>{props.flashcard?.videoUrl}</p>
                        </>
                    }
                />
            </Card>
        </>
    )
}

export default FlashcardDetails
