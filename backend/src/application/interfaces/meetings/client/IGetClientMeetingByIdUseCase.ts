import { ServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetClientMeetingByIdUseCase {
  execute(serviceId: string, clientId: string): Promise<ServiceResponseDTO>;
}