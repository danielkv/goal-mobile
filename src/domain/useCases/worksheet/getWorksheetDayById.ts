import { FUNCTION_CALL } from '@common/providers/firebase'
import { IDayModel } from '@models/day'

type GetWorksheetDayByIdData = { worksheetId: string; dayId: string }

const getWorksheetDayByIdFn = FUNCTION_CALL<GetWorksheetDayByIdData, IDayModel>('getWorksheetDayById')

export async function getWorksheetDayByIdFnUseCase(worksheetId: string, dayId: string): Promise<IDayModel> {
    const response = await getWorksheetDayByIdFn({ worksheetId, dayId })

    return response.data
}
