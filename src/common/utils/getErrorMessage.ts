export function getErrorMessage(err: any): string {
    if (__DEV__) console.error('MESSAGE CAUGHT', err)

    if (err instanceof Error || err.message) return err.message

    if (typeof err === 'string') return err

    return 'Erro desconhecido'
}
