import { CategoryResponseDTO } from "../../dtos/category/CategoryDTO";

export interface IUpdateCategoryUseCase {
  execute(
    id: string,
    data: {
      name: string;
      isActive: boolean;
    }
  ): Promise<CategoryResponseDTO>;
}