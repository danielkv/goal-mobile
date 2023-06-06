import { useRef, useState } from 'react'
import { Alert, Image, ImageBackground } from 'react-native'

import LoginBg from '@assets/images/login-bg.png'
import LogoGoal from '@assets/images/logo-goal.png'
import Button from '@components/Button'
import SafeAreaView from '@components/SafeAreaView'
import TextField from '@components/TextField'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import { createUserUseCase } from '@useCases/auth/createUser'
import { logMessageUseCase } from '@useCases/log/logMessage'
import { createAppException } from '@utils/exceptions/AppException'
import { getErrorMessage } from '@utils/getErrorMessage'

import { FormikConfig, useFormik } from 'formik'
import { H3, ScrollView, Stack, useTheme } from 'tamagui'

import { TLoginForm, initialValues, validationSchema } from './config'

const SubscriptionScreen: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigation = useNavigation()

    const theme = useTheme()

    const inputRefs = useRef<Record<string, any>>({})

    const onSubmit: FormikConfig<TLoginForm>['onSubmit'] = async (result) => {
        try {
            await createUserUseCase({
                displayName: result.name,
                phoneNumber: `+55${result.phoneNumber}`,
                email: result.email,
                password: result.password,
            })

            Alert.alert(
                'Sua conta criada com sucesso',
                'Verifique sua caixa de entrada ou lixo eletrônico para verificar seu email.',
                [{ style: 'default', onPress: () => navigation.navigate(ERouteName.LoginScreen) }]
            )
        } catch (err) {
            const logError = createAppException('ERROR_CAUGHT', err)
            logMessageUseCase(logError.toObject())
            Alert.alert('Ocorreu um erro', getErrorMessage(err))
        }
    }

    const { handleSubmit, handleChange, values, errors, isSubmitting } = useFormik({
        onSubmit,
        validationSchema,
        initialValues: initialValues(),
    })

    return (
        <SafeAreaView>
            <ImageBackground style={{ flex: 1 }} resizeMode="cover" source={LoginBg}>
                <ScrollView
                    flex={1}
                    contentContainerStyle={{ paddingVertical: 35 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Stack mt="$8" mb="$8">
                        <Image source={LogoGoal} style={{ width: '100%', height: 60, resizeMode: 'contain' }} />
                    </Stack>

                    <Stack mb="$6">
                        <H3 fontWeight="900" textAlign="center">
                            Faça seu cadastro
                        </H3>
                    </Stack>

                    <Stack px="$5" gap="$4" alignItems="center">
                        <TextField
                            autoFocus
                            label="Nome"
                            onChangeText={handleChange('name')}
                            value={values.name}
                            error={errors.name}
                            returnKeyType="next"
                            ref={(ref) => (inputRefs.current['name'] = ref)}
                            onSubmitEditing={() => {
                                inputRefs.current?.email?.focus()
                            }}
                        />
                        <TextField
                            label="Email"
                            componentLeft={<MaterialIcons name="person" ml="2" color="$gray4" size={22} />}
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            value={values.email}
                            error={errors.email}
                            returnKeyType="next"
                            ref={(ref) => (inputRefs.current['email'] = ref)}
                            onSubmitEditing={() => {
                                inputRefs.current?.phoneNumber?.focus()
                            }}
                        />
                        <TextField
                            label="Telefone"
                            keyboardType="phone-pad"
                            componentLeft={<MaterialIcons name="phone" ml="2" color="$gray4" size={22} />}
                            onChangeText={handleChange('phoneNumber')}
                            value={values.phoneNumber}
                            error={errors.phoneNumber}
                            returnKeyType="next"
                            ref={(ref) => (inputRefs.current['phoneNumber'] = ref)}
                            onSubmitEditing={() => {
                                inputRefs.current?.passwor?.focus()
                            }}
                        />
                        <TextField
                            label="Senha"
                            onChangeText={handleChange('password')}
                            value={values.password}
                            error={errors.password}
                            secureTextEntry={!showPassword}
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
                            returnKeyType="next"
                            ref={(ref) => (inputRefs.current['password'] = ref)}
                            onSubmitEditing={() => handleSubmit()}
                        />

                        <Button variant="primary" loading={isSubmitting} onPress={() => handleSubmit()}>
                            Cadastrar
                        </Button>
                        <Button disabled={isSubmitting} onPress={() => navigation.navigate(ERouteName.LoginScreen)}>
                            Login
                        </Button>
                    </Stack>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default SubscriptionScreen
