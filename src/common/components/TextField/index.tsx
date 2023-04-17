import { IInputProps, Input, Text, VStack } from 'native-base'

export interface TextFieldProps extends IInputProps {
    label?: string
}
export const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
    return (
        <VStack space={2}>
            {label && (
                <Text fontSize={12} color="white">
                    {label}
                </Text>
            )}
            <Input variant="unstyled" width="full" {...props} />
        </VStack>
    )
}
