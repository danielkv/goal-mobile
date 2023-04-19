import { Alert, Box, Center, HStack, Text, VStack } from 'native-base'

export interface AlertBoxProps {
    type: 'error' | 'success' | 'warning' | 'info'
    title?: string
    text: string
}

const AlertBox: React.FC<AlertBoxProps> = ({ type, text, title }) => {
    return (
        <Center my={6}>
            <Alert width="full" status={type} colorScheme="red">
                <HStack flexShrink={1} space={2}>
                    <Alert.Icon mt={2} alignSelf="flex-start" />
                    <VStack flex={1}>
                        {title && (
                            <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                {title}
                            </Text>
                        )}
                        <Box
                            _text={{
                                color: 'coolGray.600',
                            }}
                        >
                            {text}
                        </Box>
                    </VStack>
                </HStack>
            </Alert>
        </Center>
    )
}

export default AlertBox
