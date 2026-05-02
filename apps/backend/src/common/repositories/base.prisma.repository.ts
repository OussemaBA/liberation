import { IBaseRepository } from '../interfaces/repository.interface';

/**
 * Abstract Base Repository for Prisma
 * Provides generic implementation for CRUD operations to keep code DRY.
 */
export abstract class BasePrismaRepository<T> implements IBaseRepository<T> {
  constructor(
    protected readonly prisma: any,
    protected readonly model: string,
  ) {}

  async create(data: any): Promise<T> {
    return this.prisma[this.model].create({ data });
  }

  async findAll(filter: any = {}): Promise<T[]> {
    return this.prisma[this.model].findMany(filter);
  }

  async findById(id: string): Promise<T | null> {
    return this.prisma[this.model].findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<T> {
    return this.prisma[this.model].update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return this.prisma[this.model].delete({ where: { id } });
  }
}
