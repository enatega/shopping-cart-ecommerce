import { StyleSheet } from 'react-native'
import { colors, alignment } from '../../utils'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.container,
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.PxSmall
  },
  cardImageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  imgResponsive: {
    flex: 1,
    justifyContent: 'center',
    width: undefined,
    height: undefined
  },
  cardText: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
})
export default styles
