import { firebaseProvider } from '@common/providers/firebase'
import { IWorksheetModel } from '@models/day'

const getWorksheetsFn = firebaseProvider.FUNCTION_CALL<never, IWorksheetModel[]>('getWorksheets')

export async function getWorksheetListUseCase(): Promise<IWorksheetModel[]> {
    const response = await getWorksheetsFn()

    return response.data
}
