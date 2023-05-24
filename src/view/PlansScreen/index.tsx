import { useCallback, useEffect } from 'react'
import { Alert, Platform } from 'react-native'
import PagerView from 'react-native-pager-view'
import Purchases, { LOG_LEVEL } from 'react-native-purchases'

import { IPlan } from '@common/interfaces/plan'
import PlanCard from '@components/PlanCard'
import { getErrorMessage } from '@utils/getErrorMessage'

const PLANS: IPlan[] = [
    {
        name: 'Free',
        features: [
            'Acesso a atualizações com atrasos de conteúdo e exercícios.',
            'Timer para cronometrar os intervalos de descanso e tempos de execução durante os treinos.',
            'Acesso a uma seleção limitada de exercícios e rotinas de treino.',
        ],
    },
    {
        name: 'PRO',
        features: [
            'Acesso completo e em tempo real a todas as planilhas',
            'Timer avançado com recursos adicionais, como configuração de intervalos personalizados.',
            'Acesso a recursos extras, como programas de treinamento específicos.',
            'Suporte prioritário da equipe de coaches para esclarecer dúvidas e fornecer orientação personalizada.',
        ],
        price: 100,
    },
]

async function getOfferings() {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE)

    if (Platform.OS === 'ios') {
        await Purchases.configure({ apiKey: 'appl_ZMlLZgdpHCIslayeeznLXslcGLj' })
    }

    try {
        const offerings = await Purchases.getOfferings()
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
            console.log(JSON.stringify(offerings.current, null, 2))
        }
    } catch (e) {
        Alert.alert('Ocorreu um erro', getErrorMessage(e))
    }
}

const PlansScreen: React.FC = () => {
    const handleSelectPlan = useCallback((plan: IPlan) => {
        console.log(plan)
    }, [])

    useEffect(() => {
        getOfferings()
    }, [])

    return (
        <PagerView style={{ flex: 1 }}>
            {PLANS.map((plan) => (
                <PlanCard key={plan.name} plan={plan} onSelect={handleSelectPlan} />
            ))}
        </PagerView>
    )
}

export default PlansScreen
