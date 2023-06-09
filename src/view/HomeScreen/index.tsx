import { ImageBackground } from 'react-native'

import { Box, Button, Flex, Image, VStack } from 'native-base'

import HomeBG from '@assets/images/home-bg.png'
import LogoGoal from '@assets/images/logo-goal.png'
import { useLoggedUser } from '@contexts/user/userContext'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'

const HomeScreen: React.FC = () => {
    const { navigate } = useNavigation()
    const user = useLoggedUser()

    return (
        <ImageBackground style={{ flex: 1 }} source={HomeBG}>
            <Flex direction="column" px={4} pt={8} flex={1}>
                <Box flex={1} mt={55}>
                    <Image
                        source={LogoGoal}
                        style={{ width: '100%', height: 60, resizeMode: 'contain' }}
                        alt="Logo Goal"
                    />
                </Box>
                <VStack space={6} mb={81}>
                    {user ? (
                        <Button onPress={() => navigate(ERouteName.WorksheetListScreen)}>Planilhas</Button>
                    ) : (
                        <>
                            <Button onPress={() => navigate(ERouteName.LoginScreen)}>Logar</Button>
                            <Button onPress={() => navigate(ERouteName.SubscriptionScreen)}>Cadastrar</Button>
                        </>
                    )}

                    <Button onPress={() => navigate(ERouteName.TimersScreen)}>Timers</Button>
                </VStack>
            </Flex>
        </ImageBackground>
    )
}

export default HomeScreen
