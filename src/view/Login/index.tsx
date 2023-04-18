import { useState } from 'react'
import { Alert, Image, ImageBackground } from 'react-native'

import { Box, Button, Heading, Icon, Pressable, Stack, Text, View } from 'native-base'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { TLoginForm, initialValues, validationSchema } from './config'
import LoginBg from '@assets/images/login-bg.png'
import LogoGoal from '@assets/images/logo-goal.png'
import { TextField } from '@components/TextField'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import { logUserInUseCase } from '@useCases/auth/logUserIn'
import { getErrorMessage } from '@utils/getErrorMessage'
import { FormikConfig, useFormik } from 'formik'

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigation = useNavigation()

    const onSubmit: FormikConfig<TLoginForm>['onSubmit'] = async (result) => {
        try {
            await logUserInUseCase({ provider: 'email', ...result })

            navigation.navigate(ERouteName.Home)
        } catch (err) {
            Alert.alert('Ocorreu um erro', getErrorMessage(err))
        }
    }

    const { handleSubmit, handleChange, values, errors, isSubmitting } = useFormik({
        onSubmit,
        validationSchema,
        initialValues: initialValues(),
    })

    return (
        <View flex={1}>
            <ImageBackground style={{ flex: 1 }} source={LoginBg}>
                <Box mt="75px" mb={30}>
                    <Image source={LogoGoal} style={{ width: '100%', height: 60, resizeMode: 'contain' }} />
                </Box>

                <Box mb={8}>
                    <Heading mb={2} textAlign="center">
                        Bem vindo
                    </Heading>
                    <Text textAlign="center">Faça seu login</Text>
                </Box>

                <Stack paddingX={5} space={4} w="100%" alignItems="center">
                    <TextField
                        label="Email"
                        InputLeftElement={
                            <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
                        }
                        onChangeText={handleChange('email')}
                        value={values.email}
                        error={errors.email}
                    />
                    <TextField
                        label="Password"
                        onChangeText={handleChange('password')}
                        value={values.password}
                        error={errors.password}
                        type={showPassword ? 'text' : 'password'}
                        InputRightElement={
                            <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Icon
                                    as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />}
                                    size={5}
                                    mr="2"
                                    color="muted.400"
                                />
                            </Pressable>
                        }
                    />

                    <Button isLoading={isSubmitting} width="full" onPress={() => handleSubmit()}>
                        Login
                    </Button>
                </Stack>
            </ImageBackground>
        </View>
    )
}

export default Login
