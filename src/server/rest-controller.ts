import {ResourceBase, Route} from "./resource";
import {Request, Response} from "express";

export abstract class RestController<T> extends ResourceBase {

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
    async index(req: Request, res: Response) {
    }

    @Route('/:id', 'GET')
    async byId(req: Request, res: Response) {
    }

    @Route('/', 'PUT')
    async create(req: Request, res: Response) {
    }

    @Route('/:id', 'POST')
    async update(req: Request, res: Response) {
    }

    @Route('/:id', 'DEL')
    async delete(req: Request, res: Response) {
    }

}
