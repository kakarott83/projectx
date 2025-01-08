import { Role } from "./role";

export interface UserData {
    uid: string,
    email: string,
    name: string,
    roles: Role[],
    team: string
}