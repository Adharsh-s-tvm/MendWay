import { ServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetWorkerMeetingByIdUseCase {
  execute(serviceId: string, workerId: string): Promise<ServiceResponseDTO>;
}