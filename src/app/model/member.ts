import {MemberDate} from './memberDate'

export interface Member {
    id?: string,
    name?: string,
    firstName?: string,
    birthday?: Date,
    age?: number,
    street?: string,
    housenumber?: string,
    email?: string,
    team?: string,
    zip?: string,
    city?: string,
    position?: string,
    entryDate?: Date,
    currSalary?: number,
    uid?: string,
    appointments?: MemberDate[]
}