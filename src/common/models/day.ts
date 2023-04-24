import { IBlock } from './block'

export interface ISection {
    name: string
    blocks: IBlock[]
}

export interface IPeriod {
    name?: string
    sections: ISection[]
}

export interface IDayModel {
    id: string
    name: string
    date: string // YYYY-MM-DD
    periods: IPeriod[]
}

export interface IWorksheetModel {
    id: string
    name: string
    info?: string
    startDate: string // YYYY-MM-DD
    days: IDayModel[]
}
