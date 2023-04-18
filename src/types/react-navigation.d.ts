import React from 'react'

import { TReactNavigationStackParamList } from '@routes/index'

declare global {
    namespace ReactNavigation {
        interface RootParamList extends TReactNavigationStackParamList {}
    }
}
