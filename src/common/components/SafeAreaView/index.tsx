import { PropsWithChildren } from 'react'
import { Platform } from 'react-native'

import { Box, KeyboardAvoidingView } from 'native-base'

const SafeAreaView: React.FC<PropsWithChildren> = (props) => {
    return (
        <Box flex={1}>
            <KeyboardAvoidingView
                flex={1}
                enabled={Platform.OS === 'ios'}
                behavior="padding"
                keyboardVerticalOffset={70}
                {...props}
            />
        </Box>
    )
}

export default SafeAreaView
