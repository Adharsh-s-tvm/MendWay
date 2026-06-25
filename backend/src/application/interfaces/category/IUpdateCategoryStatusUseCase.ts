import { CategoryResponseDTO } from "../../dtos/category/CategoryDTO";

export interface IUpdateCategoryStatusUseCase {
  execute(id: string): Promise<CategoryResponseDTO>;
}