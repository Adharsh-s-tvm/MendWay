import { CreateWorkerScheduleDTO, WorkerScheduleDTO } from "../../../dtos/worker/WorkerScheduleDTO";

export interface ICreateWorkerScheduleUseCase {
  execute(dto: CreateWorkerScheduleDTO): Promise<WorkerScheduleDTO[]>;
}
