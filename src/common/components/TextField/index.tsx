import { FormControl, IInputProps, Input, Text, VStack } from 'native-base'

export interface TextFieldProps extends IInputProps {
    label?: string
    error?: string
}
const TextField: React.FC<TextFieldProps> = ({ label, error, ...props }) => {
    return (
        <FormControl>
            <VStack space={2}>
                {label && (
                    <Text fontSize={12} color="gray.100">
                        {label}
                    </Text>
                )}
                <Input variant="unstyled" width="full" {...props} />
                {error && (
                    <Text color="red.400" fontSize={12} fontWeight="light">
                        {error}
                    </Text>
                )}
            </VStack>
        </FormControl>
    )
}

export default TextField
