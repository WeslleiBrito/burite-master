import { UserDB } from "../types/types"
import { BaseDatabase } from "./BaseDatabase"


export class UserDatabase extends BaseDatabase implements UserDatabaseI {
    
    public static TABLE_USER: string = "users"

    public signup = async (input: UserDB): Promise<void> => {

        await UserDatabase.connectionDatabaseSqlite(UserDatabase.TABLE_USER).insert(input)
    }

    public findUserById = async (id: string): Promise<UserDB | undefined> => {
        
        const [result]: UserDB[] | undefined[] = await UserDatabase.connectionDatabaseSqlite(UserDatabase.TABLE_USER).where({id})

        return result
    }
    
    public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        
        const [result]: UserDB[] | undefined[] = await UserDatabase.connectionDatabaseSqlite(UserDatabase.TABLE_USER).where({email})
       
        return result
    }

    public findRole = async (role: string): Promise<UserDB | undefined> => {
        
        const [result]: UserDB[] | undefined[] = await UserDatabase.connectionDatabaseSqlite(UserDatabase.TABLE_USER).where({role})

        return result
    }

    public editAccount = async (input: {id: string, name: string, password: string}): Promise<void> => {
        
        const {id, name, password} = input

        await UserDatabase.connectionDatabaseSqlite(UserDatabase.TABLE_USER).update({name, password}).where({id})

    }

    public deleteAccount = async (id: string): Promise<void> => {

        await UserDatabase.connectionDatabaseSqlite(UserDatabase.TABLE_USER).del().where({id})

    }

    public getAllUsers = async (): Promise<UserDB[]> => {

        const result: UserDB[] = await UserDatabase.connectionDatabaseSqlite(UserDatabase.TABLE_USER).select("*") 

        return result
    }
}

export interface UserDatabaseI {
    signup (input: UserDB): Promise<void>
    findUserById(id: string): Promise<UserDB | undefined>
    findUserByEmail(email: string): Promise<UserDB | undefined>
    findRole(role: string): Promise<UserDB | undefined>
    editAccount(input: {id: string, name: string, password: string}): Promise<void>
    deleteAccount(input: string): Promise<void>
}