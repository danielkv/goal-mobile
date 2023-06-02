import { useRef, useState } from 'react'
import { Alert, Image, ImageBackground } from 'react-native'

import { Box, Button, Heading, Icon, Link, Pressable, ScrollView, Stack, Text } from 'native-base'

import LoginBg from '@assets/images/login-bg.png'
import LogoGoal from '@assets/images/logo-goal.png'
import ActivityIndicator from '@components/ActivityIndicator'
import SafeAreaView from '@components/SafeAreaView'
import TextField from '@components/TextField'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import { logUserInUseCase } from '@useCases/auth/logUserIn'
import { sendResetPasswordEmailUseCase } from '@useCases/auth/sendResetPasswordEmail'
import { isAppException } from '@utils/exceptions/AppException'
import { getErrorMessage } from '@utils/getErrorMessage'

import { FormikConfig, useFormik } from 'formik'

import { TLoginForm, initialValues, validationSchema } from './config'

const LoginScreen: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigation = useNavigation()
    const [loadingResetPassword, setLoadingResetPassword] = useState(false)

    const inputRefs = useRef<Record<string, any>>({})

    const onSubmit: FormikConfig<TLoginForm>['onSubmit'] = async (result) => {
        try {
            await logUserInUseCase({ provider: 'email', ...result })

            navigation.navigate(ERouteName.HomeScreen)
        } catch (err) {
            if (isAppException(err) && err.type === 'EMAIL_NOT_VERIFIED') {
                return Alert.alert(
                    'Seu email não foi verificado',
                    'Verifique sua caixa de entrada ou lixo eletrônico para verificar seu email',
                    [
                        {
                            text: 'OK',
                            style: 'default',
                            isPreferred: true,
                        },
                    ]
                )
            }
            Alert.alert('Ocorreu um erro', getErrorMessage(err))
        }
    }

    const { handleSubmit, handleChange, values, errors, isSubmitting, validateField } = useFormik({
        onSubmit,
        validationSchema,
        initialValues: initialValues(),
    })

    const handleResetPassword = async () => {
        try {
            setLoadingResetPassword(true)
            await validateField('email')
            if (errors.email) return

            await sendResetPasswordEmailUseCase(values.email)

            Alert.alert(
                'Instruções enviadas para seu email',
                'Enviamos um email para você resetar sua senha. Caso não encontre o email na caixa de entrada, verifique no lixo eletrônico.'
            )
        } catch (err) {
            Alert.alert('Ocorreu um erro', getErrorMessage(err))
        } finally {
            setLoadingResetPassword(false)
        }
    }

    return (
        <SafeAreaView>
            <ImageBackground style={{ flex: 1 }} source={LoginBg}>
                <ScrollView flex={1} contentContainerStyle={{ paddingVertical: 35 }} keyboardShouldPersistTaps="always">
                    <Box mt={50} mb={30}>
                        <Image source={LogoGoal} style={{ width: '100%', height: 60, resizeMode: 'contain' }} />
                    </Box>

                    <Box mb={8}>
                        <Heading mb={2} lineHeight="2xl" textAlign="center">
                            Bem vindo
                        </Heading>
                        <Text textAlign="center">Faça seu login</Text>
                    </Box>

                    <Stack paddingX={5} space={4} w="100%" alignItems="center">
                        <TextField
                            label="Email"
                            autoFocus
                            InputLeftElement={
                                <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
                            }
                            onChangeText={handleChange('email')}
                            value={values.email}
                            error={errors.email}
                            returnKeyType="next"
                            innerRef={(ref: any) => (inputRefs.current['email'] = ref)}
                            onSubmitEditing={() => {
                                inputRefs.current['password']?.focus()
                            }}
                        />
                        <TextField
                            innerRef={(ref) => {
                                inputRefs.current['password'] = ref
                            }}
                            label="Senha"
                            onChangeText={handleChange('password')}
                            value={values.password}
                            error={errors.password}
                            returnKeyType="join"
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
                            onSubmitEditing={() => handleSubmit()}
                        />

                        <Button isLoading={isSubmitting} width="full" onPress={() => handleSubmit()}>
                            Login
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            colorScheme="gray"
                            width="full"
                            onPress={() => navigation.navigate(ERouteName.SubscriptionScreen)}
                        >
                            Novo cadastro
                        </Button>
                        {loadingResetPassword ? (
                            <ActivityIndicator />
                        ) : (
                            <Link onPress={handleResetPassword}>Esqueci a senha</Link>
                        )}
                    </Stack>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default LoginScreen
