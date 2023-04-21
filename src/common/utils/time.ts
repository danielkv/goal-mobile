import dayjs from 'dayjs'

export function getTimeFromSeconds(seconds: number): string {
    const t = dayjs.duration(seconds, 'seconds')

    if (Number(t.format('ss')) <= 0) return `${t.format("m'")}`

    return t.format("m'ss''")
}

export function stringTimeToSeconds(string: string): number {
    const splited = string.split(':')
    const minutes = Number(splited[0])
    const seconds = Number(splited[1])

    if (Number.isNaN(minutes) || Number.isNaN(seconds)) return 0

    const duration = dayjs.duration({ minutes, seconds })

    return duration.asSeconds()
}

export function secondsToStringTime(time: number): string {
    const duration = dayjs.duration(time, 'seconds')

    return duration.format('mm:ss')
}
