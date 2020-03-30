import {Resource} from "../server/resource";
import {RestController} from "../server/rest-controller";
import {QuizModel} from "../models/quiz.model";

@Resource('/sample')
export default class QuizResource extends RestController<QuizModel> {

}
