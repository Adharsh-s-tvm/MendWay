import { ServiceResponseDTO } from "../../dtos/service/ServiceDTO";

export interface ICancelServiceUseCase {
  execute(
    serviceId: string,
    userId: string,
    reason?: string
  ): Promise<ServiceResponseDTO>;
}