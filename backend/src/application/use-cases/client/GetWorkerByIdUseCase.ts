import { Worker } from "../../../domain/entities/Worker";
import { IWorkerRepository } from "../../../domain/repositories/IWorkerRepository";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { IReviewRepository } from "../../../domain/repositories/IReviewRepository";
import { IUserRepositoryFactory } from "../../../domain/repositories/IUserRepositoryFactory";
import { S3Service } from "../../../infrastructure/adapters/S3service";
import { Role, VerificationStatus } from "../../../shared/enums/authEnums";
import { IGetWorkerByIdUseCase } from "../../interfaces/client/IGetWorkerByIdUseCase";
import { WorkerResponseDTO } from "../../dtos/worker/WorkerDTO";
import { AddressDTO } from "../../dtos/address/AddressDTO";

function workerToDTO(worker: Worker): WorkerResponseDTO {
  const address: AddressDTO[] | undefined = worker.address?.map((a) => ({
    addressId: a.addressId,
    label: a.label,
    street: a.street,
    city: a.city,
    state: a.state,
    country: a.country,
    zip: a.zip,
    lat: a.location.coordinates[1],
    lng: a.location.coordinates[0],
    isDefault: a.isDefault,
  }));

  return {
    user_id: worker.userId,
    user_name: worker.name,
    email_address: worker.email,
    phone_number: worker.phone,
    user_role: worker.role,
    profileImageUrl: worker.profilePictureUrl,
    isBlocked: worker.isBlocked ?? false,
    isOnline: worker.isOnline,
    isVerified: worker.isVerified ?? VerificationStatus.PENDING,
    skills: worker.skills,
    address,
    documents: worker.documents,
    certificates: worker.certificates,
    excludedServices: worker.excludedServices,
    categories: worker.categories,
    workPhotos: worker.workPhotos,
    rating: worker.rating,
    totalRatings: worker.totalRatings,
    weeklyJobCount: worker.weeklyJobCount,
    currentActiveRequestId: worker.currentActiveRequestId ?? undefined,
    isSuspended: worker.isSuspended,
    suspensionStartDate: worker.suspensionStartDate?.toISOString(),
    suspensionEndDate: worker.suspensionEndDate?.toISOString(),
    canAcceptBookings: worker.canAcceptBookings,
    createdAt: worker.createdAt.toISOString(),
    updatedAt: worker.updatedAt.toISOString(),
  };
}

export class GetWorkerByIdUseCase implements IGetWorkerByIdUseCase {
  constructor(
    private readonly _workerRepository: IWorkerRepository,
    private readonly _categoryRepository: ICategoryRepository,
    private readonly _reviewRepository: IReviewRepository,
    private readonly _userRepoFactory: IUserRepositoryFactory,
    private readonly _s3Service: S3Service
  ) { }

  async execute(id: string): Promise<WorkerResponseDTO | null> {
    const worker = await this._workerRepository.findById(id);

    if (!worker) return null;

    // Resolve category IDs to category names
    if (worker.categories && worker.categories.length > 0) {
      const dbCategories = await this._categoryRepository.findByIds(worker.categories);
      worker.categories = dbCategories.map(cat => cat.name);
    }

    // Fetch reviews
    const reviews = await this._reviewRepository.findByWorkerId(id);
    const totalRatings = reviews.length;
    const totalSum = reviews.reduce((sum, r) => sum + r.rating, 0);
    const rating = totalRatings > 0 ? totalSum / totalRatings : 0;

    await this._workerRepository.updateById(id, { rating, totalRatings });
    worker.rating = rating;
    worker.totalRatings = totalRatings;

    // Fetch client names for reviews
    const reviewsWithClientNames = await Promise.all(reviews.map(async (review) => {
      try {
        const clientRepo = this._userRepoFactory.getRepository(Role.CLIENT);
        const workerRepo = this._userRepoFactory.getRepository(Role.WORKER);
        let client = await clientRepo.findById(review.clientId);
        client ??= await workerRepo.findById(review.clientId);

        return {
          reviewId: review.reviewId,
          serviceId: review.serviceId,
          clientId: review.clientId,
          workerId: review.workerId,
          rating: review.rating,
          review: review.review,
          createdAt: review.createdAt,
          clientName: client?.name ?? "Anonymous Client"
        };
      } catch (error) {
        console.error(`[GetWorkerById] Error fetching client for review:`, error);
        return {
          ...review,
          clientName: "Anonymous Client"
        };
      }
    }));

    worker.reviews = reviewsWithClientNames;

    if (worker.profilePictureUrl && !worker.profilePictureUrl.startsWith('http')) {
      try {
        const presignedUrl = await this._s3Service.getPresignedDownloadUrl(worker.profilePictureUrl);
        return workerToDTO({ ...worker, profilePictureUrl: presignedUrl });
      } catch (error) {
        console.error(`Error generating presigned URL for worker ${worker.userId}:`, error);
      }
    }

    return workerToDTO(worker);
  }
}
