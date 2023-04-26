export type EventType = 'for_time' | 'max_weight' | 'emom' | 'amrap' | 'not_timed'

export type WeightTypes = 'kg' | 'lb' | '%' | 'none'

export type MovementWeight = {
    type: WeightTypes
    value: string
}

export type EventMovement = {
    name: string
    reps: string
    weight?: MovementWeight
    videoUrl?: string
}

export type EventRound = {
    name?: string
    repeat?: string
    movements: EventMovement[]
}

export type BlockType = 'event' | 'rest' | 'text' | ''

export type EventBlockEMOM = {
    event_type: 'emom'
    each: number
    for: number
}

export type EventBlockTimecap = {
    event_type: Exclude<EventType, 'emom' | 'not_timed'>
    timecap: number // seconds
}

export type EventBlockNotTimed = {
    event_type: 'not_timed'
}

export type IEventBlock = {
    type: 'event'
    name?: string
    rounds: EventRound[]
    event_type: EventType
} & (EventBlockEMOM | EventBlockTimecap | EventBlockNotTimed)

export type IRestBlock = {
    type: 'rest'
    time: number
    text?: string
}

export type ITextBlock = {
    type: 'text'
    text: string
}

export type EmptyBlock = {
    type: ''
}

export type Block = { info?: string; type: BlockType } & (IEventBlock | IRestBlock | ITextBlock | EmptyBlock)
