export interface DatabaseProps {
    question: string;
    answers: string[];
    correctAnswer: string | number | number[];
    type: string;
}

export interface IQuizCardProps {
    database: DatabaseProps;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    setResult: (result: number) => void;
}

export interface QuizQuestion {
    question: string
    answers: string[] | string
    correctAnswer: number | string | number[]
    type: string
}
export interface AnswersProps {
    answers: string[] | number
}

export interface ResultProps {
    correctAnswer: number
    db: DatabaseProps[]
    setCurrentPage: (page: number) => void
    setResult: (result: number) => void
    setTimeleft: (time: number) => void
}