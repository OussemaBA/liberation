export interface IBaseRepository<T> {
    create(data: any): Promise<T>;
    findAll(filter?: any): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: any): Promise<T>;
    delete(id: string): Promise<T>;
}
