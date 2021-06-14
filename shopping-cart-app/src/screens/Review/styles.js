import { Dimensions, StyleSheet } from 'react-native'
import { textStyles, colors, scale } from '../../utils'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaView: {
    backgroundColor: colors.headerbackground
  },
  mainBackground: {
    backgroundColor: colors.themeBackground
  },
  reviewTextContainer: {
    width: '100%',
    height: height * 0.1,
    alignItems: 'flex-end'
  },
  reviewTextSubContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row'
  },
  reviewTextContainerText: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  reviewTextContainerImage: {
    width: '50%',
    height: '100%',
    justifyContent: 'center'
  },
  ratingContainer: {
    width: '100%',
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ratingSubContainer: {
    width: '70%',
    height: '60%'
  },
  inputContainer: {
    width: '100%',
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputSubContainer: {
    width: '80%',
    height: '40%',
    borderBottomColor: colors.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textinput: {
    height: '100%',
    ...textStyles.Regular,
    ...textStyles.Normal
  },
  btnSubContainer: {
    width: '80%',
    height: scale(50),
    alignSelf: 'center'
  },
  btnTouch: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8)
  }
})
export default styles
