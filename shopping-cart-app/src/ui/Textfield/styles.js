import { alignment, fontStyles, colors, scale } from '../../utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  input_view: {
    backgroundColor: colors.white,
    borderRadius: 3,
    height: scale(40),
    justifyContent: 'center',
    borderWidth: 1
  },
  input: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(13),
    ...alignment.PLsmall
  }
})
export default styles
