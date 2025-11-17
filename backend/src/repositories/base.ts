export interface BaseRepository<DTO, Entity> {
    save(data: DTO): Promise<Entity>;
    findAll(): Promise<Entity[]>;
    findById(id: number): Promise<Entity | null>;
    update(data: DTO): Promise<Entity>;
    patch(data: Partial<DTO>): Promise<Entity>;
    delete(id: number): Promise<void>;
}   