import { ServiceResponseDTO } from "../../dtos/service/ServiceDTO";

export interface ICompleteServiceUseCase {
  execute(
    serviceId: string,
    workerId: string
  ): Promise<ServiceResponseDTO>;
}