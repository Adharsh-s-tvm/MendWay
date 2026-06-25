import { ServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetClientOngoingServicesUseCase {
  execute(clientId: string): Promise<ServiceResponseDTO[]>;
}