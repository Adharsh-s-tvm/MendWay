import { GetWorkerBlockedDatesResponseDTO } from "../../../dtos/worker/WorkerScheduleDTO";

export interface IGetWorkerBlockedDatesUseCase {
  execute(workerId: string): Promise<GetWorkerBlockedDatesResponseDTO[]>;
}