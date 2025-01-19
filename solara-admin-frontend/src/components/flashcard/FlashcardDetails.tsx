import { Card } from "antd";
import ReactPlayer from "react-player";
import { ExerciseDto } from "../../types/exercise";

interface IProps {
    flashcard: ExerciseDto | null;
    handleReloadTable: () => void;
}

const FlashcardDetails = (props: IProps) => {
    return (
        <Card
            // title="Flashcard Details"
            className="flex flex-col items-start justify-start p-4 shadow-md rounded-lg border border-gray-300 bg-white max-h-[60vh] overflow-y-auto"
        >
            {props.flashcard ? (
                <div className="space-y-4 w-full">
                    <h2 className="text-xl font-semibold text-gray-800 text-left leading-snug">
                        {props.flashcard?.question}
                    </h2>
                    <p className="text-sm text-gray-500 italic">
                        Difficulty: <span className="font-medium">{props.flashcard?.difficulty}</span>
                    </p>

                    {props.flashcard.imageUrl?.trim() && (
                        <img
                            src={props.flashcard.imageUrl.trim()}
                            alt="Flashcard"
                            className="w-full h-auto rounded-md shadow-sm object-cover"
                        />
                    )}

                    {props.flashcard.videoUrl?.trim() && (
                        <div className="w-full rounded-md overflow-hidden shadow-sm">
                            <ReactPlayer
                                controls
                                url={props.flashcard.videoUrl}
                                width="100%"
                                className="rounded-md"
                            />
                        </div>
                    )}

                    {props.flashcard.ans && props.flashcard.ans.length > 0 && (
                        <div className="w-full">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Answer Options:
                            </h3>
                            <ul className="list-none space-y-2">
                                {props.flashcard.ans.map((option, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-gray-700 bg-gray-100 p-2 rounded-md shadow-sm hover:bg-gray-200 transition"
                                    >
                                        <span className="inline-block w-4 h-4 bg-green-500 rounded-full mt-1"></span>
                                        <div>
                                            <p className="font-medium">{option.optionText}</p>
                                            {option.explanation && (
                                                <p className="text-sm text-gray-500">{option.explanation}</p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center text-gray-500 text-base">
                    Please choose a flashcard!
                </div>
            )}
        </Card>
    );
};


export default FlashcardDetails;
