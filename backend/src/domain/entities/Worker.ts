import { Role } from "../Enums";

export interface Worker {
    workerId:string,
    name:string,
    email:string,
    password:string,
    phone:number,
    role: Role.WORKER,
    skills: string[],
    isBlocked:boolean,
    profilePictureUrl?:string,
    lastLoginAt: Date,
    createdAt:Date,
    updatedAt:Date,
} 