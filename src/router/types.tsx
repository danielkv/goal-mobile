import { IEMOMTimer, ITabataTimer, ITimecapTimer } from '@models/time'

export type TReactNavigationStackParamList = {
    LoginScreen: undefined

    SubscriptionScreen: undefined

    HomeScreen: undefined

    WorksheetListScreen: undefined

    TimersScreen: undefined

    EmomTimerScreen?: Partial<IEMOMTimer>

    RegressiveTimerScreen?: Partial<ITimecapTimer>

    TabataTimerScreen?: Partial<ITabataTimer>

    StopwatchTimerScreen?: Partial<ITimecapTimer>

    WorksheetList: undefined

    WorksheetDays: { id: string }

    DayView: { worksheetId: string; dayId: string }

    Plans: undefined
}

export enum ERouteName {
    LoginScreen = 'LoginScreen',

    SubscriptionScreen = 'SubscriptionScreen',

    HomeScreen = 'HomeScreen',

    WorksheetListScreen = 'WorksheetListScreen',

    TimersScreen = 'TimersScreen',

    RegressiveTimerScreen = 'RegressiveTimerScreen',

    StopwatchTimerScreen = 'StopwatchTimerScreen',

    EmomTimerScreen = 'EmomTimerScreen',

    TabataTimerScreen = 'TabataTimerScreen',

    WorksheetList = 'WorksheetList',

    WorksheetDays = 'WorksheetDays',

    DayView = 'DayView',

    SectionCarousel = 'SectionCarousel',

    Plans = 'Plans',
}
