import { CategoryResponseDTO } from "../../dtos/category/CategoryDTO";

export interface IGetAllCategoriesUseCase {
    execute(options?: {
        search?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }): Promise<{
        categories: CategoryResponseDTO[];
        total: number;
        activeCount: number;
        inactiveCount: number;
    }>;
}
