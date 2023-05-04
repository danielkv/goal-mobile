import { numberHelper } from './numbers'
import { pluralize } from './strings'
import { TBlockType, TEventType } from '@models/block'
import { IEventBlock, IMovementWeight } from '@models/block'
import { getTimeFromSeconds } from '@utils/time'

export const blockTypesMap: Record<Exclude<TBlockType, ''>, string> = {
    event: 'Evento ',
    rest: 'REST',
    text: 'Texto',
}

export const eventTypesMap: Record<TEventType, string> = {
    not_timed: 'Sem tempo',
    for_time: 'For Time',
    tabata: 'Tabata',
    amrap: 'AMRAP',
    emom: 'EMOM',
    max_weight: 'Carga máxima',
}

export function displayWeight(weight?: IMovementWeight): string {
    if (!weight?.value || weight.type === 'none') return ''

    const value = numberHelper.convertNumbers(weight.value, { suffix: '', separator: `${weight.type} ` })

    return ` - ${value}${weight.type}`
}

export const getTimeCap = (block: IEventBlock) => {
    if (block.event_type === 'emom') {
        if (!block.each || !block.numberOfRounds) return ''
        const each = getTimeFromSeconds(block.each)
        return ` - Cada ${each} por ${block.numberOfRounds} ${pluralize(block.numberOfRounds, 'round')}`
    }

    if (block.event_type === 'tabata') {
        if (!block.work || !block.rest || !block.numberOfRounds) return ''
        const work = getTimeFromSeconds(block.work)
        const rest = getTimeFromSeconds(block.rest)
        return ` - ${work}/${rest} por ${block.numberOfRounds} ${pluralize(block.numberOfRounds, 'round')}`
    }

    if (block.event_type === 'not_timed') return ''

    if (!block.timecap) return ''

    const timecap = getTimeFromSeconds(block.timecap)
    return ` - ${timecap}`
}
