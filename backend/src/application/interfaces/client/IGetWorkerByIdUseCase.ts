import { WorkerResponseDTO } from "../../dtos/worker/WorkerDTO";

export interface IGetWorkerByIdUseCase {
  execute(id: string): Promise<WorkerResponseDTO | null>;
}
