import { StyleSheet } from 'react-native'
import { colors, alignment, verticalScale } from '../../utils'

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  pT20: {
    ...alignment.PTmedium,
    ...alignment.PBmedium
  },
  mainContainer: {
    backgroundColor: colors.themeBackground,
    ...alignment.PTlarge,
    ...alignment.PBlarge,
    ...alignment.PLsmall,
    ...alignment.PRsmall
  },
  radioContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioGroup: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  iconContainer: {
    width: '25%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStyle: {
    height: verticalScale(20),
    width: verticalScale(35)
  }
})
export default styles
