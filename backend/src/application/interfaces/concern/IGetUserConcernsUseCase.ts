import { ConcernResponseDTO } from "../../dtos/concern/ConcernDTO";

export interface IGetUserConcernsUseCase {
  execute(userId: string): Promise<ConcernResponseDTO[]>;
}