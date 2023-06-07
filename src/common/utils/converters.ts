import { IDayModel, IWorksheetModel } from '@models/day'

import { FirestoreDataConverter } from 'firebase/firestore'
import { pick } from 'radash'

export const dayConverter: FirestoreDataConverter<IDayModel> = {
    fromFirestore(snapshot) {
        return {
            ...(snapshot.data() as IDayModel),
            id: snapshot.id,
        }
    },
    toFirestore(model) {
        return pick(model, ['date', 'name', 'periods'])
    },
}

export const worksheetConverter: FirestoreDataConverter<Omit<IWorksheetModel, 'days' | 'isCurrent'>> = {
    fromFirestore(snapshot) {
        return {
            ...(snapshot.data() as IWorksheetModel),
            id: snapshot.id,
        }
    },
    toFirestore(model) {
        return pick(model, ['info', 'name', 'published', 'startDate', 'startEndDate'])
    },
}
