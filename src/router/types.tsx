export type TReactNavigationStackParamList = {
    LoginScreen: undefined

    HomeScreen: undefined

    WorksheetListScreen: undefined

    TimersScreen: undefined

    EmomTimerScreen: undefined

    RegressiveTimerScreen: undefined

    TabataTimerScreen: undefined

    StopwatchTimerScreen: undefined

    WorksheetList: undefined

    WorksheetDays: { id: string }

    DayView: { worksheetId: string; dayId: string }
}

export enum ERouteName {
    LoginScreen = 'LoginScreen',

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
}
