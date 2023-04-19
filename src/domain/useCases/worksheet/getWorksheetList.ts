import { FUNCTION_CALL } from '@common/providers/firebase'
import { Worksheet } from '@models/day'

const getWorksheetsFn = FUNCTION_CALL<never, Worksheet[]>('getWorksheets')

export async function getWorksheetListUseCase(): Promise<Worksheet[]> {
    const response = await getWorksheetsFn()

    return response.data
}
