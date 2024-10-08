export interface DatabaseProps {
    question: string;
    answers: string[];
    correctAnswer: string | number | number[];
    type: string;
}

export interface SetResultProps {
    setResult: (result: number) => void;
}

export interface SetCurrentPageProps {
    setCurrentPage: (page: number) => void;
}

export interface IQuizCardProps extends SetResultProps, SetCurrentPageProps {
    database: DatabaseProps;
    currentPage: number;
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
}