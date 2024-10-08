import { Button } from "@mui/material"
import { ResultProps } from "./types/types"

export function Result({
    correctAnswer,
    db,
    setCurrentPage,
    setResult,
}: ResultProps) {

    const handleRestart = () => {
        setCurrentPage(0);
        setResult(0);
    };

    return (
        <div className="result">
            <h1>Ваш результат</h1>
            <h2>
                {correctAnswer}/{db.length}
            </h2>
            <Button
                variant="contained"
                onClick={handleRestart}
            >
                Попробовать ещё раз
            </Button>
        </div>
    );
}

export default Result;
