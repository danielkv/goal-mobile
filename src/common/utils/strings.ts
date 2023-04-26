export function pluralize(number: number, word: string, plural: string = word + 's') {
    return [1, -1].includes(number) ? word : plural
}

export function capitalize(word: string) {
    return `${word.substring(0, 1).toLocaleUpperCase()}${word.substring(1)}`
}
