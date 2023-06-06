import { PropsWithChildren } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

import { Stack } from 'tamagui'

const SafeAreaView: React.FC<PropsWithChildren> = (props) => {
    return (
        <Stack flex={1}>
            <KeyboardAvoidingView style={{ flex: 1 }} enabled={Platform.OS === 'ios'} behavior="padding" {...props} />
        </Stack>
    )
}

export default SafeAreaView
