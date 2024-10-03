import { Card } from "antd"
import { FlashcardModel } from "../../types/flashcard.type";

interface IProps {
    flashcard: FlashcardModel | null
    handleReloadTable: () => void
}

const FlashcardDetails = (props: IProps) => {

    return (
        <>
            <Card>
                {
                    props.flashcard != null ?

                        <Card.Meta
                            title="Card title"
                            description={
                                <>
                                    <p>{props.flashcard?.flashcardId}</p>
                                    <p>{props.flashcard?.question}</p>
                                    <p>{props.flashcard?.answer}</p>
                                    <p>{props.flashcard?.difficulty}</p>
                                    <img src={props.flashcard.imageUrl!} alt="" />

                                </>
                            }
                        /> : <>Please choose a flashcard</>
                }
            </Card>
        </>
    )
}

export default FlashcardDetails
