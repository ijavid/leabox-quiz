import 'reflect-metadata';
import {Resource, ResourceBase, Route} from "../server/resource";
import {SampleService} from "../services/sample.service";
import {Request} from "express";

@Resource('/public')
export class PublicApiResource extends ResourceBase {

    constructor(public service: SampleService) {
        super();
        // console.log(this.service);
    }


    @Route('/enroll', 'POST')
    async enrollForQuiz() {
        return {
            sessionId: ''
        }
    }

    @Route('/questions', 'GET')
    async getQuizQuestions(request: Request) {
        const id = request.params.id;
        return {
            id,
            name: 'Sample',
            questions: []
        }
    }

    @Route('/submit', 'POST')
    async submitResult(request: Request) {
        const id = request.params.id;
        return {
            result: id
        }
    }
}
