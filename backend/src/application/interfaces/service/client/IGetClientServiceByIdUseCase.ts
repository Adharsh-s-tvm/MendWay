import { ServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetClientServiceByIdUseCase {
  execute(serviceId: string, clientId: string): Promise<ServiceResponseDTO>;
}