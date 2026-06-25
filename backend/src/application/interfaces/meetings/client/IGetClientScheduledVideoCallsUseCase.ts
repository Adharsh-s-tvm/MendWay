import { ServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetClientScheduledMeetingsUseCase {
    execute(clientId: string): Promise<ServiceResponseDTO[]>;
}