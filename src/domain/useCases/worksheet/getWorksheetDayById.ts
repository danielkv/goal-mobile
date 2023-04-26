import { FUNCTION_CALL } from '@common/providers/firebase'
import { DayModel } from '@models/day'

type GetWorksheetDayByIdData = { worksheetId: string; dayId: string }

const getWorksheetDayByIdFn = FUNCTION_CALL<GetWorksheetDayByIdData, DayModel>('getWorksheetDayById')

export async function getWorksheetDayByIdFnUseCase(worksheetId: string, dayId: string): Promise<DayModel> {
    const response = await getWorksheetDayByIdFn({ worksheetId, dayId })

    return response.data
}
