import { useRef, useState } from 'react'
import { Alert, Image, ImageBackground } from 'react-native'

import LoginBg from '@assets/images/login-bg.png'
import LogoGoal from '@assets/images/logo-goal.png'
import ActivityIndicator from '@components/ActivityIndicator'
import Button from '@components/Button'
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
import { H3, ScrollView, Stack, Text, YStack } from 'tamagui'
import { useTheme } from 'tamagui'

import { TLoginForm, initialValues, validationSchema } from './config'

const LoginScreen: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigation = useNavigation()
    const [loadingResetPassword, setLoadingResetPassword] = useState(false)
    const theme = useTheme()

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
                <ScrollView
                    flex={1}
                    contentContainerStyle={{ paddingVertical: 35 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Stack mt="$8" mb="$8">
                        <Image source={LogoGoal} style={{ width: '100%', height: 60, resizeMode: 'contain' }} />
                    </Stack>

                    <Stack mb="$6">
                        <H3 textAlign="center" fontWeight="900">
                            Bem vindo
                        </H3>
                        <Text textAlign="center">Faça seu login</Text>
                    </Stack>

                    <YStack px="$5" gap="$4" ai="center">
                        <TextField
                            label="Email"
                            autoFocus
                            componentLeft={<MaterialIcons name="person" size={22} color={theme.gray5.val} />}
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            value={values.email}
                            error={errors.email}
                            returnKeyType="next"
                            ref={(ref: any) => (inputRefs.current['email'] = ref)}
                            onSubmitEditing={() => {
                                inputRefs.current['password']?.focus()
                            }}
                        />
                        <TextField
                            ref={(ref) => {
                                inputRefs.current['password'] = ref
                            }}
                            label="Senha"
                            onChangeText={handleChange('password')}
                            value={values.password}
                            error={errors.password}
                            returnKeyType="join"
                            secureTextEntry={showPassword}
                            componentRight={
                                <Button
                                    variant="transparent"
                                    size="$3"
                                    circular
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <MaterialIcons
                                        name={showPassword ? 'visibility' : 'visibility-off'}
                                        size={22}
                                        color={theme.gray5.val}
                                    />
                                </Button>
                            }
                            onSubmitEditing={() => handleSubmit()}
                        />

                        <Button variant="primary" loading={isSubmitting} onPress={() => handleSubmit()}>
                            Login
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            onPress={() => navigation.navigate(ERouteName.SubscriptionScreen)}
                        >
                            Novo cadastro
                        </Button>
                        {loadingResetPassword ? (
                            <ActivityIndicator />
                        ) : (
                            <Button variant="link" onPress={handleResetPassword}>
                                Esqueci a senha
                            </Button>
                        )}
                    </YStack>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default LoginScreen
