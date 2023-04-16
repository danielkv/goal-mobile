import { Box, Heading, Icon, Input, Pressable, Stack, Text, View } from 'native-base'
import React, { useState } from 'react'
import { Image, ImageBackground } from 'react-native'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import LoginBg from '../../assets/images/login-bg.png'
import LogoGoal from '../../assets/images/logo-goal.png'

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)

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

                <Stack space={4} w="100%" alignItems="center">
                    <Input
                        w={{
                            base: '75%',
                            md: '25%',
                        }}
                        variant="unstyled"
                        InputLeftElement={
                            <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
                        }
                        placeholder="Email"
                    />
                    <Input
                        w={{
                            base: '75%',
                            md: '25%',
                        }}
                        type={showPassword ? 'text' : 'password'}
                        variant="unstyled"
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
                        placeholder="Password"
                    />
                </Stack>
            </ImageBackground>
        </View>
    )
}

export default Login
