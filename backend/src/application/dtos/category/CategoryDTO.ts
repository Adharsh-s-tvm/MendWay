export interface CategoryResponseDTO {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCategoryDTO {
    name: string;
}

export interface UpdateCategoryDTO {
    name: string;
    isActive: boolean;
}

export interface GetAllCategoriesResponseDTO {
    categories: CategoryResponseDTO[];
    total: number;
    activeCount: number;
    inactiveCount: number;
}