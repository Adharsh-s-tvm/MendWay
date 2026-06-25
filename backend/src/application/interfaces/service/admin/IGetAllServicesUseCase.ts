import { AdminServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetAllServicesUseCase {
    execute(): Promise<AdminServiceResponseDTO[]>;
}