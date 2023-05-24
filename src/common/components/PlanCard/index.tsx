import { Box, Button, Divider, HStack, Text, VStack, useTheme } from 'native-base'

import { IPlan } from '@common/interfaces/plan'
import { MaterialIcons } from '@expo/vector-icons'

export interface PlanCardProps {
    onSelect?: (plan: IPlan) => void
    selected?: Boolean
    plan: IPlan
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, selected }) => {
    const { colors } = useTheme()

    return (
        <VStack space="4" flex={1} m={8} borderRadius="lg" bg="gray.900">
            <HStack alignItems="center" justifyContent="center" space={3} pt={5} pb={2}>
                <Text fontSize={30} fontWeight="bold" lineHeight={35} textTransform="uppercase" textAlign="center">
                    {plan.name}
                </Text>

                {!!plan.price && (
                    <Box p={3} bg="yellow.300" rounded="full">
                        <Text color="gray.900" textAlign="center" fontSize={16}>
                            R$ {plan.price.toFixed(2).replace('.', ',')}/mês
                        </Text>
                    </Box>
                )}
            </HStack>
            <Divider bg="gray.600" />
            <Box px="5" flex={1}>
                <VStack space={3}>
                    {plan.features.map((feature) => (
                        <HStack space={1} key={feature}>
                            <MaterialIcons style={{ marginTop: 6 }} name="circle" color={colors.gray[300]} size={6} />
                            <Text>{feature}</Text>
                        </HStack>
                    ))}
                </VStack>
            </Box>

            {selected ? (
                <Box bg="green.500" borderBottomRadius="lg" py={6}>
                    <Text textAlign="center" color="white" fontSize={16} lineHeight={16}>
                        Este é seu plano
                    </Text>
                </Box>
            ) : (
                !!onSelect && (
                    <Button borderBottomRadius="lg" borderTopRadius={0} py={6} onPress={() => onSelect(plan)}>
                        <Text fontSize={16} lineHeight={16}>
                            Selecionar
                        </Text>
                    </Button>
                )
            )}
        </VStack>
    )
}

export default PlanCard
