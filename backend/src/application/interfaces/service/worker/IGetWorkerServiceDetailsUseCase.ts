import { ServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetWorkerServiceDetailsUseCase {
    execute(
        serviceId: string,
        workerId: string
    ): Promise<ServiceResponseDTO>;
}