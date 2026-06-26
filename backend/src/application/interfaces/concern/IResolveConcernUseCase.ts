import { ConcernResponseDTO } from "../../dtos/concern/ConcernDTO";

export interface IResolveConcernUseCase {
  execute(concernId: string, resolutionMessage: string, adminId?: string): Promise<ConcernResponseDTO | null>;
}
