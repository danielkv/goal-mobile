import { FUNCTION_CALL } from '@common/providers/firebase'

const logMessageFn = FUNCTION_CALL<Record<string, any>, void>('logMessage')

export async function logMessageUseCase(data: Record<any, string>): Promise<void> {
    await logMessageFn(data)
}
