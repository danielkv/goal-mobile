import React from 'react'
import { SafeAreaView } from 'react-native'

import { Box } from 'native-base'

import AlertBox from '@components/AlertBox'
import { logMessageUseCase } from '@useCases/log/logMessage'
import { createAppException } from '@utils/exceptions/AppException'
import { getErrorMessage } from '@utils/getErrorMessage'

export class ErrorBoundary extends React.Component<any, any> {
    state = {
        error: false,
        errorInfo: false,
    }

    static getDerivedStateFromError() {
        return { error: true }
    }

    componentDidCatch(error: any, errorInfo: any) {
        const logError = createAppException('ERROR_BOUNDARY', error, errorInfo)
        logMessageUseCase(logError.toObject())

        this.setState({ error: true, errorInfo })
    }

    render() {
        if (!this.state.error) return this.props.children

        return (
            <SafeAreaView>
                <Box flex={1} bg="gray.100">
                    <AlertBox
                        type="error"
                        text={getErrorMessage(this.state.errorInfo)}
                        title="Ocorreu um erro na aplicação"
                    />
                </Box>
            </SafeAreaView>
        )
    }
}

export default ErrorBoundary
