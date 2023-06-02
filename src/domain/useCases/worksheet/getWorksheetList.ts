import { firebaseProvider } from '@common/providers/firebase'
import { IWorksheetModel } from '@models/day'

import dayjs from 'dayjs'

export function getWorksheetListUseCase(): Promise<IWorksheetModel[]> {
    const fs = firebaseProvider.firestore
    console.log(fs.collection<IWorksheetModel>('worksheets').get)
    return fs
        .collection<IWorksheetModel>('worksheets')
        .get()
        .then((snapshot) => {
            const worksheets = snapshot.docs.map((doc) => {
                const worksheetData = doc.data()
                const isCurrent = worksheetData.startEndDate
                    ? dayjs().isBetween(worksheetData.startEndDate.start, worksheetData.startEndDate.end, 'day', '[]')
                    : false

                return {
                    ...worksheetData,
                    isCurrent,
                }
            })

            return worksheets
        })
}

// I'm having a similar issue:

// ```tsx
// export async function getDataUseCase() {
//     const fs = firebase.firestore()

//     const snapshot = await fs.collection('myCollection').get()

//     return snapshot.docs.map((doc) =>doc.data())
// }
// ```
// It works fine on Android device, but it not in IOS device.
// The `const fs` has the expected value, but the `get` method does not exist
