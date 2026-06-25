import { ServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetWorkerMeetingsHistoryUseCase {
    execute(workerId: string): Promise<ServiceResponseDTO[]>;
}