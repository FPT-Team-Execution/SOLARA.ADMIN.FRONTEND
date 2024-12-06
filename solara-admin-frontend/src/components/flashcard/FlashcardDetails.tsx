import { Card } from "antd";
import ReactPlayer from "react-player";
import { ExerciseDto } from "../../types/exercise";
interface IProps {
    flashcard: ExerciseDto | null;
    handleReloadTable: () => void;
}

const FlashcardDetails = (props: IProps) => {
    return (
        <>
            <Card title="Flashcard Details" className="flex flex-col items-center justify-center">
                {props.flashcard != null ? (
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <p className="text-lg font-semibold text-gray-700">
                            {props.flashcard?.question}
                        </p>
                        {/* <p className="text-md italic text-gray-600">
                            {props.flashcard?.ans}
                        </p> */}
                        <p className="text-sm text-gray-500">
                            Difficulty: {props.flashcard?.difficulty}
                        </p>
                        {props.flashcard.imageUrl?.trim() && (
                            <img
                                src={props.flashcard.imageUrl.trim()}
                                alt="Flashcard"
                                className="object-cover rounded-lg"
                            />
                        )}
                        {props.flashcard.videoUrl?.trim() && (
                            <div className="rounded-lg overflow-hidden">
                                <ReactPlayer controls url={props.flashcard.videoUrl} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        Please choose a flashcard!
                    </div>
                )}
            </Card>
        </>
    );
};

export default FlashcardDetails;
