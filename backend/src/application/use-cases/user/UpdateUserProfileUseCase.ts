import { ILogger } from "../../../infrastructure/logger/ILogger";
import { Role } from "../../../shared/enums/authEnums";
import { UserResponseDTO } from "../../dtos/user/UserDTO";
import { UserMapper } from "../../mappers/UserMapper";
import { User } from "../../../domain/entities/User";
import { IUploadProfilePictureUseCase } from "../../interfaces/user/IUploadProfilePictureUseCase";
import { IUserRepositoryFactory } from "../../../domain/repositories/IUserRepositoryFactory";
import { IUpdateUserProfileUseCase } from "../../interfaces/user/IUpdateUserProfileUseCase";
import { ValidationError } from "../../validators/AuthValidator";

export class UpdateUserProfileUseCase implements IUpdateUserProfileUseCase {

    constructor(
        private readonly _repositoryFactory: IUserRepositoryFactory,
        private readonly _logger: ILogger,
        private readonly _uploadProfilePictureUseCase: IUploadProfilePictureUseCase,
    ) { }

    async execute(
        userId: string,
        updates: Partial<User>,
        profilePictureFilePath?: string,
        mimetype?: string
    ): Promise<UserResponseDTO> {

        this._logger.info(`[UpdateUserProfileUseCase] Updating profile for user ${userId}`);

        // Always search both repos
        const workerRepo = this._repositoryFactory.getRepository(Role.WORKER);
        const clientRepo = this._repositoryFactory.getRepository(Role.CLIENT);

        let repo = workerRepo;
        let user = await workerRepo.findById(userId);

        if (!user) {
            user = await clientRepo.findById(userId);
            repo = clientRepo;
        }

        if (!user) throw new Error("User not found");

        if (updates.phone !== undefined && updates.phone !== null) {
            const phoneStr = String(updates.phone).trim();
            if (!/^\d{10,15}$/.test(phoneStr)) {
                throw new ValidationError("Phone number must be a valid 10 to 15 digit number");
            }
            if (/^0+$/.test(phoneStr)) {
                throw new ValidationError("Phone number cannot consist of all zeroes");
            }
        }

        const updatedUser: Partial<User> = { ...user, ...updates };

        let signedUrl: string | undefined;

        if (profilePictureFilePath && mimetype) {
            const { url, key } = await this._uploadProfilePictureUseCase.execute(userId, profilePictureFilePath, mimetype);
            updatedUser.profilePictureUrl = key;
            signedUrl = url;
        } else if (profilePictureFilePath) {
            throw new Error("Mimetype is required when uploading a profile picture");
        }

        updatedUser.role = user.role;

        const saved = await repo.updateById(userId, updatedUser);

        if (!saved) throw new Error("Failed to update user profile");

        const response = UserMapper.toResponseDTO(saved);

        // If we uploaded a new picture, ensure the response has the signed URL so frontend can display it
        if (signedUrl) {
            response.profileImageUrl = signedUrl;
        }

        return response;
    }
}
