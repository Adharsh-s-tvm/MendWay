import { ServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetActiveWorkerServiceUseCase {
    execute(workerId: string): Promise<ServiceResponseDTO | null>;
}