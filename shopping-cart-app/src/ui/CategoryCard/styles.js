import { StyleSheet, Dimensions } from 'react-native'
import { colors, scale, alignment } from '../../utils'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: width * 0.4,
    height: scale(50),
    backgroundColor: colors.whiteColor,
    borderRadius: scale(5),
    ...alignment.MTxSmall,
    ...alignment.MRxSmall
  },
  textViewContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.PRxSmall,
    ...alignment.PLxSmall
  }
})
export default styles
