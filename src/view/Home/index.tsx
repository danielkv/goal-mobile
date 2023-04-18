import { Button, Text, View } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'

const Home: React.FC = () => {
    const { navigate } = useNavigation()
    return (
        <View>
            <Text>Home page</Text>
            <Button onPress={() => navigate(ERouteName.Login)}>Login Page</Button>
        </View>
    )
}

export default Home
