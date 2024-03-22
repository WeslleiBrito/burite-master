import { USER_ROLES, UserModel } from "../types/types";

export class User {
    constructor(
        private user: UserModel
    ) {}
    
    
    public getId = (): string => {
        return this.user.id
    }

    public getName = (): string => {
        return this.user.name
    }

    public getEmail = (): string => {
        return this.user.email
    }

    public getPassword = (): string => {
        return this.user.password
    }

    public getRole = (): USER_ROLES => {
        return this.user.role
    }

    public getCreatedAt = (): Date => {
        return this.user.createdAt
    }

    public getUpdatedAt = (): Date => {
        return this.user.updatedAt
    }

    public getUserModel = (): UserModel => {
        return {
            id: this.user.id,
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            role: this.user.role,
            createdAt: this.user.createdAt,
            updatedAt: this.user.updatedAt
        }
    }

    public setName = (newName: string): void => {
        this.user.name = newName
    }

    public setPassword = (newPassword: string): void => {
        this.user.password = newPassword
    }

    public setRole = (newRole: USER_ROLES): void => {
        this.user.role = newRole
    }

    public setUpdatedAt = (newDate: Date): void => {
        this.user.updatedAt = newDate
    }

    public setUpdatedEmail = (newEmail: string): void => {
        this.user.email = newEmail
    }
}