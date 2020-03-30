import {Resource} from "../server/resource";
import {RestController} from "../server/rest-controller";
import {QuizModel} from "../models/quiz.model";
import {SampleService} from "../services/sample.service";

@Resource('/sample')
export class QuizResource extends RestController<QuizModel> {
    private service = this.injector.get(SampleService) as SampleService;
}
