import { ServiceResponseDTO } from "../../../dtos/service/ServiceDTO";

export interface IGetClientMeetingsHistoryUseCase {
    execute(clientId: string): Promise<ServiceResponseDTO[]>;
}