export type TReactNavigationStackParamList = {
    Login: undefined

    Home: undefined

    TimersScreen: undefined

    WorksheetList: undefined

    WorksheetDays: { id: string }

    DayView: { worksheetId: string; dayId: string }
}

export enum ERouteName {
    Login = 'Login',

    Home = 'Home',

    TimersScreen = 'TimersScreen',

    WorksheetList = 'WorksheetList',

    WorksheetDays = 'WorksheetDays',

    DayView = 'DayView',

    SectionCarousel = 'SectionCarousel',
}
