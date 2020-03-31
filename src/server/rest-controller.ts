import {ResourceBase, Route} from "./resource";
import {Request, Response} from "express";
import {Document, Model} from "mongoose";

export abstract class RestController<T extends Document> extends ResourceBase {

    constructor(protected model: Model<T, {}>) {
        super();
    }

    async afterRead(items: T[]): Promise<T[]> {
        return items;
    }

    async afterWrite(id: number, item: T): Promise<void> {
    }

    async beforeWrite(item: T, req: Request): Promise<T> {
        return item;
    }

    async beforeDelete(id: number, item: T): Promise<void> {
    }

    @Route('/', 'GET')
    async list(req: Request, res: Response) {
        const docs = await this.model.find();
        return this.afterRead(docs);
    }

    @Route('/:id', 'GET')
    async byId(req: Request, res: Response) {
        return this.findById(req.params.id);
    }

    @Route('', 'PUT')
    async create(req: Request, res: Response) {
        const data = await this.beforeWrite(req.body, req);
        const model = await new this.model(data).save();
        await this.afterWrite(model.id, model);
        return this.findById(model.id);
    }

    @Route('/:id', 'POST')
    async update(req: Request, res: Response) {
        const model = await this.findById(req.params.id);
        const data = await this.beforeWrite(req.body, req);
        await model.updateOne(data);
        await this.afterWrite(model.id, model);
        return this.findById(model.id);
    }

    @Route('/:id', 'DEL')
    async delete(req: Request, res: Response) {
        const model = await this.findById(req.params.id);
        await this.beforeDelete(req.params.id, model);
        await model.remove();
        return [req.params.id];
    }

    protected async findById(id) {
        const doc = await this.model.findById(id);
        if (!doc) {
            throw Error('Not found: ' + id);
        }
        return (await this.afterRead([doc]))[0];
    }

}
