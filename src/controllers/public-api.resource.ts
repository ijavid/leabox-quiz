import 'reflect-metadata';
import {Resource, ResourceBase, Route} from "../server/resource";
import {Request} from "express";
import {QuizModel} from "../models/quiz.model";

@Resource('/public')
export class PublicApiResource extends ResourceBase {

    @Route('/enroll', 'POST')
    async enrollForQuiz() {
        return {
            sessionId: ''
        }
    }

    @Route('/questions/:id', 'GET')
    async getQuizQuestions(request: Request) {
        const id = request.params.id;
        const doc = await QuizModel.findById(id);
        return doc.questions;
    }

    @Route('/submit', 'POST')
    async submitResult(request: Request) {
        const id = request.params.id;
        return {
            result: id
        }
    }
}
