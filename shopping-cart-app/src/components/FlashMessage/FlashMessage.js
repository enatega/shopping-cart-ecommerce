import { showMessage } from 'react-native-flash-message'
import styles from './styles'
import PropTypes from 'prop-types'

export const FlashMessage = props => {
  showMessage({
    message: props.message,
    type: props.type,
    position: props.position ?? 'top',
    floating: true,
    titleStyle: styles.text,
    style: styles.position
  })
}
FlashMessage.propTypes = {
  message: PropTypes.string.isRequired
}
