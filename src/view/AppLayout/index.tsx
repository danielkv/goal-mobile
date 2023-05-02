import React from 'react'

import { Box } from 'native-base'

import AppBottomBar from '@components/AppBottomBar'
import Router from '@router/index'

const AppLayout: React.FC = () => {
    return (
        <Box flex={1}>
            <Router />
            <AppBottomBar />
        </Box>
    )
}

export default AppLayout
