import {Schema, Document} from "mongoose";
import * as Mongoose from "mongoose";

export interface Answer extends Document {
    content: string;

    explanation?: string;
}

export interface Question extends Document {
    title: string;
    kind: string;
    answers: Answer[];

    category?: string;
    tags?: string[];
    resolution?: any[];
    difficulty?: any;
    explanation?: string;
    code_block?: string;
    comment?: string;
}

export interface Quiz extends Document {
    title: string,
    questions: Question[]
}

export const AnswerSchema = new Schema({
    content: String
});
export const QuestionSchema = new Schema({
    title: String,
    kind: String,
    answers: [AnswerSchema]
});
export const QuizSchema = new Schema({
    title: String,
    questions: [QuestionSchema]
});


export const QuizModel = Mongoose.model('QuizSchema', QuizSchema);
