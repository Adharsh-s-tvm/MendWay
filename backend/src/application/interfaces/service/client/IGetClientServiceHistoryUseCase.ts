import { ServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetClientServiceHistoryUseCase {
  execute(clientId: string): Promise<ServiceResponseDTO[]>;
}