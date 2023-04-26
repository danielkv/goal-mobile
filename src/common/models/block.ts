export type TEventType = 'for_time' | 'max_weight' | 'amrap' | 'emom' | 'tabata' | 'not_timed'

export type TWeightTypes = 'kg' | 'lb' | '%' | 'none'

export type TBlockType = 'event' | 'rest' | 'text' | ''

export interface IMovementWeight {
    type: TWeightTypes
    value: string
}

export interface IEventMovement {
    name: string
    reps: string
    weight?: IMovementWeight
    videoUrl?: string
}

export interface IEventRound {
    name?: string
    repeat?: string
    movements: IEventMovement[]
}

export interface IEventBlockEMOM {
    event_type: 'emom'
    each: number
    numberOfRounds: number
}

export interface IEventBlockTimecap {
    event_type: Extract<TEventType, 'for_time' | 'max_weight' | 'amrap'>
    timecap: number // seconds
}

export interface IEventBlockNotTimed {
    event_type: 'not_timed'
}
export type IEventBlockTabata = {
    event_type: 'tabata'
    work: number
    rest: number
    numberOfRounds: number
}

export type IEventBlock = {
    type: 'event'
    name?: string
    rounds: IEventRound[]
    event_type: TEventType
} & (IEventBlockEMOM | IEventBlockTimecap | IEventBlockNotTimed | IEventBlockTabata)

export interface IRestBlock {
    type: 'rest'
    time: number
    text?: string
}

export interface ITextBlock {
    type: 'text'
    text: string
}

export interface EmptyBlock {
    type: ''
}

export type IBlock = { info?: string; type: TBlockType } & (IEventBlock | IRestBlock | ITextBlock | EmptyBlock)
