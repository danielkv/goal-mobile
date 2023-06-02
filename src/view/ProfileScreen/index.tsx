import { useCallback, useState } from 'react'
import { Alert } from 'react-native'

import { Button, Text, VStack, useTheme } from 'native-base'

import { setLoggedUser, useLoggedUser } from '@contexts/user/userContext'
import { MaterialIcons } from '@expo/vector-icons'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import { logUserOutUseCase } from '@useCases/auth/logUserOut'
import { removeUserUseCase } from '@useCases/auth/removeUser'
import { getErrorMessage } from '@utils/getErrorMessage'

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

    if (!user) return null

    return (
        <VStack alignItems="stretch" p={6} space={4}>
            <VStack alignItems="center" space={4}>
                <MaterialIcons name="person-pin" size={100} color={colors.gray[100]} />
                <Text fontSize={16}>{user.email}</Text>
            </VStack>
            <Button
                leftIcon={<MaterialIcons name="logout" size={20} color={colors.white} />}
                onPress={logUserOutUseCase}
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
