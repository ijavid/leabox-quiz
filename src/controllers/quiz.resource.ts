import 'reflect-metadata';
import {Resource} from "../server/resource";
import {RestController} from "../server/rest-controller";
import {Quiz, QuizModel} from "../models/quiz.model";
import {SampleService} from "../services/sample.service";

@Resource('/quiz')
export class QuizResource extends RestController<Quiz> {

    constructor(public service: SampleService) {
        super(QuizModel);
    }
}
