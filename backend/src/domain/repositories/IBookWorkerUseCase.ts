import { CreateServiceDTO, ServiceResponseDTO } from "../../application/dtos/service/ServiceDTO";

export interface IBookWorkerUseCase {
  execute(data: CreateServiceDTO): Promise<ServiceResponseDTO>;
}