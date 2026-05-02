"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePrismaRepository = void 0;
class BasePrismaRepository {
    prisma;
    model;
    constructor(prisma, model) {
        this.prisma = prisma;
        this.model = model;
    }
    async create(data) {
        return this.prisma[this.model].create({ data });
    }
    async findAll(filter = {}) {
        return this.prisma[this.model].findMany(filter);
    }
    async findById(id) {
        return this.prisma[this.model].findUnique({ where: { id } });
    }
    async update(id, data) {
        return this.prisma[this.model].update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma[this.model].delete({ where: { id } });
    }
}
exports.BasePrismaRepository = BasePrismaRepository;
//# sourceMappingURL=base.prisma.repository.js.map