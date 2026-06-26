import { WorkerResponseDTO } from "../../dtos/worker/WorkerDTO";


export interface IGetAvailableWorkersUseCase {
  execute(
    categoryId?: string,
    lat?: number,
    lng?: number,
    search?: string,
    isOnline?: boolean,
    page?: number,
    limit?: number,
    sortBy?: string
  ): Promise<{ workers: WorkerResponseDTO[]; total: number }>;
}