import { useState } from 'react'
import { Alert, Image, ImageBackground } from 'react-native'

import { Box, Button, Icon, Pressable, ScrollView, Stack, Text } from 'native-base'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { TLoginForm, initialValues, validationSchema } from './config'
import LoginBg from '@assets/images/login-bg.png'
import LogoGoal from '@assets/images/logo-goal.png'
import TextField from '@components/TextField'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import { createUserUseCase } from '@useCases/auth/createUser'
import { getErrorMessage } from '@utils/getErrorMessage'
import { FormikConfig, useFormik } from 'formik'

const SubscriptionScreen: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigation = useNavigation()

    const onSubmit: FormikConfig<TLoginForm>['onSubmit'] = async (result) => {
        try {
            await createUserUseCase({
                displayName: result.name,
                phoneNumber: `+55${result.phoneNumber}`,
                email: result.email,
                password: result.password,
            })

            Alert.alert(
                'Conta criada com sucesso',
                'Seu perfil será ativado em breve. Aguarde a ativação para fazer o login.',
                [{ style: 'default', onPress: () => navigation.navigate(ERouteName.LoginScreen) }]
            )
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
        <Box flex={1} safeAreaBottom>
            <ImageBackground style={{ flex: 1 }} resizeMode="cover" source={LoginBg}>
                <ScrollView flex={1} contentContainerStyle={{ paddingVertical: 35 }}>
                    <Box mt={50} mb={30}>
                        <Image source={LogoGoal} style={{ width: '100%', height: 60, resizeMode: 'contain' }} />
                    </Box>

                    <Box mb={8}>
                        <Text textAlign="center">Faça seu cadastro</Text>
                    </Box>

                    <Stack paddingX={5} space={4} w="100%" alignItems="center">
                        <TextField
                            label="Nome"
                            onChangeText={handleChange('name')}
                            value={values.name}
                            error={errors.name}
                        />
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
                            label="Telefone"
                            InputLeftElement={
                                <Icon as={<MaterialIcons name="phone" />} size={5} ml="2" color="muted.400" />
                            }
                            onChangeText={handleChange('phoneNumber')}
                            value={values.phoneNumber}
                            error={errors.phoneNumber}
                        />
                        <TextField
                            label="Senha"
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
                            Cadastrar
                        </Button>
                        <Button
                            isLoading={isSubmitting}
                            width="full"
                            colorScheme="gray"
                            onPress={() => navigation.navigate(ERouteName.LoginScreen)}
                        >
                            Login
                        </Button>
                    </Stack>
                </ScrollView>
            </ImageBackground>
        </Box>
    )
}

export default SubscriptionScreen
