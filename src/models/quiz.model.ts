export interface Answer {
    content: string;
    explanation: string;
}

export interface QuizModel {
    title?: string;
    category?: string;
    tags?: string[];
    kind: string;
    resolution?: any[];
    answers: Answer[];
    difficulty?: any;
    explanation?: string;
    code_block?: string;
    comment?: string;
}
