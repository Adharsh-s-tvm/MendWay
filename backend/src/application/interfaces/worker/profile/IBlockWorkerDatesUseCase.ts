import { BlockWorkerDatesDTO, WorkerScheduleDTO } from "../../../dtos/worker/WorkerScheduleDTO";

export interface IBlockWorkerDatesUseCase {
  execute(dto: BlockWorkerDatesDTO): Promise<WorkerScheduleDTO[]>;
}