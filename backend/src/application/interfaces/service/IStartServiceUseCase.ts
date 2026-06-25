import { ServiceResponseDTO } from "../../dtos/service/ServiceDTO";


export interface IStartServiceUseCase {
  execute(
    serviceId: string,
    workerId: string,
    lat: number,
    lng: number
  ): Promise<ServiceResponseDTO>;
}