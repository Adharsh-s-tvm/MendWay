import { AdminServiceResponseDTO } from "../../../dtos/service/ServiceDTO";


export interface IGetServiceDetailsForAdminUseCase {
    execute(serviceId: string): Promise<AdminServiceResponseDTO>;
}