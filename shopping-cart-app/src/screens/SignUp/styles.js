import { Dimensions, StyleSheet } from 'react-native'
import { verticalScale } from '../../utils/scaling'
import { colors } from '../../utils/colors'

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  container: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  body: {
    height: height * 0.95,
    width: '95%',
    alignSelf: 'center'
  },

  // Header
  header: {
    justifyContent: 'space-evenly',
    height: '20%',
    width: '90%',
    alignSelf: 'center'
  },

  // main
  main: {
    backgroundColor: colors.backgroudGray,
    height: '80%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: verticalScale(5)
  },
  bodyContainerBackground: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },

  mainTop: {
    height: '20%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainMid: {
    height: '55%',
    width: '90%',
    justifyContent: 'center'
  },
  mainBot: {
    height: '25%',
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  botBtnContainer: {
    width: '100%'
  },
  mixedLine: {
    flexDirection: 'row'
  },
  ftTextUnderline: {
    textDecorationLine: 'underline'
  }
})
export default styles
