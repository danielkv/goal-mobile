import { Spinner } from 'native-base'
import { InterfaceSpinnerProps } from 'native-base/lib/typescript/components/primitives/Spinner/types'

export interface ActivityIndicatorProps extends InterfaceSpinnerProps {}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = (props) => {
    return <Spinner color="red.500" {...props} />
}

export default ActivityIndicator
