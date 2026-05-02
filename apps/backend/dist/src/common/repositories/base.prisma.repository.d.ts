import { IBaseRepository } from '../interfaces/repository.interface';
export declare abstract class BasePrismaRepository<T> implements IBaseRepository<T> {
    protected readonly prisma: any;
    protected readonly model: string;
    constructor(prisma: any, model: string);
    create(data: any): Promise<T>;
    findAll(filter?: any): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: any): Promise<T>;
    delete(id: string): Promise<T>;
}
