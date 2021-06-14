import { Dimensions, StyleSheet } from 'react-native'
import { alignment, colors, scale, verticalScale } from '../../utils'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  container: {
    height: height * 0.92,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  body: {
    height: '100%',
    width: '95%',
    alignSelf: 'center'
  },
  bodyHeader: {
    height: '8%',
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
  },
  headerText: {
    ...alignment.PLsmall
  },
  bodyContainer: {
    width: '90%',
    height: '70%',
    alignSelf: 'center',
    backgroundColor: colors.themeBackground,
    borderRadius: scale(5)
  },
  bodyContainerBackground: {
    backgroundColor: colors.themeBackground,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  bodyFooter: {
    width: '90%',
    height: '25%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  footer: {
    height: '55%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: verticalScale(5),
    backgroundColor: colors.lightBrown,
    ...alignment.PLmedium
  },
  bcTexts: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%'
  },
  bcMain: {
    height: '45%',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  bcInputs: {
    width: '90%'
  },
  bcSocialBox: {
    width: '90%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bcSocialBtns: {
    flexDirection: 'row'
  },
  socialBtnsView: {
    width: '100%'
  },
  socialBtn: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bgCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(30),
    height: scale(30),
    backgroundColor: colors.container,
    borderRadius: scale(15),
    ...alignment.PxSmall
  },
  googleBtn: {
    height: scale(50),
    borderWidth: 0,
    borderRightWidth: 0,
    borderRadius: 3,
    borderColor: 'orange',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: colors.google
  },
  fbText: {
    ...alignment.PLmedium
  },
  ftUnderline: {
    textDecorationLine: 'underline'
  },
  LoginBtn: {
    backgroundColor: colors.buttonBackground,
    height: scale(40),
    borderRadius: scale(3)
  },
  main_brown_btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  appleBtn: {
    width: '100%',
    height: scale(50),
    ...alignment.MTsmall
  }
})
export default styles
