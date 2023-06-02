import { firebaseProvider } from '@common/providers/firebase'
import { IWorksheetModel } from '@models/day'

import dayjs from 'dayjs'

export function getWorksheetListUseCase(): Promise<IWorksheetModel[]> {
    const fs = firebaseProvider.getFirestore()

    return fs
        .collection<IWorksheetModel>('worksheets')
        .orderBy('startDate', 'desc')
        .where('published', '==', true)
        .get()
        .then((snapshot) => {
            const worksheets = snapshot.docs.map((doc) => {
                const worksheetData = doc.data()
                const isCurrent = worksheetData.startEndDate
                    ? dayjs().isBetween(worksheetData.startEndDate.start, worksheetData.startEndDate.end, 'day', '[]')
                    : false
                return {
                    ...worksheetData,
                    id: doc.id,
                    isCurrent,
                }
            })

            return worksheets
        })
}
