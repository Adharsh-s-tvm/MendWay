import { UserResponseDTO } from "../user/UserDTO";

export type WorkerResponseDTO = UserResponseDTO;

export interface GetAvailableWorkersResponseDTO {
    workers: WorkerResponseDTO[];
    total: number;
}

export interface GetAvailableWorkersRequestDTO {
    categoryId?: string;
    lat?: number;
    lng?: number;
    search?: string;
    isOnline?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
}