export function getErrorMessage(err: any): string {
    if (__DEV__) console.error('MESSAGE CAUGHT', err)

    if (err.name === 'FirebaseError') {
        const fbMessage = err.customData?._tokenResponse?.error?.message
        if (fbMessage) {
            switch (fbMessage) {
                case 'USER_DISABLED':
                    return 'Seu usuário ainda não foi habilitado'
            }
        }
    }

    if (err instanceof Error || err.message) return err.message

    if (typeof err === 'string') return err

    return 'Erro desconhecido'
}
