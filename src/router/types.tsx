export type TReactNavigationStackParamList = {
    Login: undefined

    Home: undefined

    TimersScreen: undefined

    WorksheetList: undefined

    WorksheetDays: { id: string }

    WorksheetDay: { worksheetId: string; dayId: string }

    SectionCarousel: { worksheetId: string; dayId: string; sectionIndex: number }
}

export enum ERouteName {
    Login = 'Login',

    Home = 'Home',

    TimersScreen = 'TimersScreen',

    WorksheetList = 'WorksheetList',

    WorksheetDays = 'WorksheetDays',

    WorksheetDay = 'WorksheetDay',

    SectionCarousel = 'SectionCarousel',
}
