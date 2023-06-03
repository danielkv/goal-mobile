import { useCallback, useState } from 'react'
import { Alert } from 'react-native'

import { Avatar, Button, Text, VStack, useTheme } from 'native-base'

import { setLoggedUser, useLoggedUser } from '@contexts/user/userContext'
import { MaterialIcons } from '@expo/vector-icons'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import { logUserOutUseCase } from '@useCases/auth/logUserOut'
import { removeUserUseCase } from '@useCases/auth/removeUser'
import { getErrorMessage } from '@utils/getErrorMessage'
import { getContrastColor, stringToColor, userInitials } from '@utils/strings'

const ProfileScreen: React.FC = () => {
    const { colors } = useTheme()
    const { dispatch } = useNavigation()
    const user = useLoggedUser()

    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            if (!user) dispatch(StackActions.replace(ERouteName.LoginScreen))
        }, [user])
    )

    const handlePressRemoveAccount = () => {
        Alert.alert('Confirmação', 'Tem certeza que deseja excluir sua conta?', [
            { text: 'Sim', onPress: handleConfirmRemoveAccount },
            { text: 'Não', isPreferred: true },
        ])
    }

    const handleConfirmRemoveAccount = async () => {
        try {
            setLoading(true)
            await removeUserUseCase()

            Alert.alert(
                'Conta excluída',
                'Seus dados de acesso foram excluídos. O processo de remoção de seus dados pode levar até 30 dias.'
            )

            setLoggedUser(null)
        } catch (err) {
            Alert.alert('Ocorreu um erro', getErrorMessage(err), [
                { text: 'Tentar novamente', onPress: handleConfirmRemoveAccount },
                { text: 'Cancelar', isPreferred: true },
            ])
        } finally {
            setLoading(false)
        }
    }

    const handlePressLogout = () => {
        Alert.alert('Confirmação', 'Tem certeza que deseja sair?', [
            { text: 'Sim', onPress: logUserOutUseCase },
            { text: 'Não', isPreferred: true },
        ])
    }

    if (!user) return null

    const avatarColor = stringToColor(user.displayName)
    const textAvatarColor = getContrastColor(avatarColor)

    return (
        <VStack alignItems="stretch" p={6} space={4}>
            <VStack alignItems="center" space={4}>
                <Avatar bg={avatarColor} size="xl" source={user.photoURL ? { uri: user.photoURL } : undefined}>
                    <Text lineHeight={42} fontSize={36} fontWeight="bold" color={textAvatarColor}>
                        {userInitials(user.displayName)}
                    </Text>
                </Avatar>
                <Text fontWeight="bold" fontSize={18}>
                    {user.displayName}
                </Text>
                <Text fontSize={16}>{user.email}</Text>
                {user.phoneNumber && <Text fontSize={14}>{user.phoneNumber}</Text>}
            </VStack>
            <Button
                leftIcon={<MaterialIcons name="logout" size={20} color={colors.white} />}
                onPress={handlePressLogout}
            >
                Logout
            </Button>
            <Button colorScheme="dark" isLoading={loading} variant="link" onPress={handlePressRemoveAccount}>
                <Text color="white">Excluir conta</Text>
            </Button>
        </VStack>
    )
}

export default ProfileScreen
