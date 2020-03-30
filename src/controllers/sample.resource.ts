import {Resource} from "../server/resource";
import {RestController} from "../server/rest-controller";
import {SampleModel} from "../models/sample.model";

@Resource('/sample')
export default class SampleResource extends RestController<SampleModel> {

}
