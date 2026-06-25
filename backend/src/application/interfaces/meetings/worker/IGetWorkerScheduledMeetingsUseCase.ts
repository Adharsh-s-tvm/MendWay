import { ServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetWorkerScheduledMeetingsUseCase {
    execute(workerId: string): Promise<ServiceResponseDTO[]>;
}