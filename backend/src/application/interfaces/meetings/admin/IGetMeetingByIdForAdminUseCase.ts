import { AdminServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetMeetingByIdForAdminUseCase {
    execute(serviceId: string): Promise<AdminServiceResponseDTO>;
}