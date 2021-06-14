import { Dimensions, StyleSheet } from 'react-native'
import { colors, alignment, verticalScale, scale } from '../../utils'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  formMainContainer: {
    flex: 1,
    height: height * 0.8,
    backgroundColor: colors.themeBackground,
    alignItems: 'center'
  },
  formContainer: {
    marginTop: height * 0.1,
    width: '90%',
    backgroundColor: colors.container,
    borderRadius: scale(8),
    position: 'relative',
    ...alignment.PBlarge
  },
  profileImageContainer: {
    width: verticalScale(80),
    height: verticalScale(80),
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.container,
    borderRadius: verticalScale(40),
    top: verticalScale(-40),
    borderWidth: verticalScale(3),
    borderColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContentContainer: {
    width: '100%',
    marginTop: scale(50),
    alignItems: 'center',
    ...alignment.MBmedium,
    ...alignment.PLsmall,
    ...alignment.PRsmall
  },
  twoItemsContainer: {
    width: '100%',
    height: scale(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    ...alignment.MBxSmall
  },
  halfContainer: {
    width: '45%',
    height: '80%'
  },
  labelContainer: {
    width: '100%',
    height: '40%'
  },
  inputContainer: {
    width: '100%',
    height: '60%',
    borderRadius: scale(3),
    justifyContent: 'center',
    backgroundColor: colors.themeBackground,
    ...alignment.PxSmall
  },
  inputText: {
    textAlign: 'left',
    ...alignment.PxSmall
  },
  disableInput: {
    textAlign: 'left',
    color: colors.fontThirdColor,
    ...alignment.PxSmall
  },
  oneItemContainer: {
    width: '100%',
    height: scale(80),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  fullContainer: {
    width: '95%',
    height: '80%'
  },
  addContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    borderWidth: scale(1),
    borderColor: colors.errorColor,
    borderRadius: scale(3)
  }
})
export default styles
