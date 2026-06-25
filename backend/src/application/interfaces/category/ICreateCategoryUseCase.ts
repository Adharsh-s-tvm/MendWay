import { CategoryResponseDTO } from "../../dtos/category/CategoryDTO";

export interface ICreateCategoryUseCase {
    execute(name: string): Promise<CategoryResponseDTO>;
}
