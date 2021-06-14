import { Dimensions, StyleSheet } from 'react-native'
import { verticalScale, scale } from '../../utils/scaling'
import { fontStyles } from '../../utils/fontStyles'
import { colors } from '../../utils'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.themeBackground
  },
  footerContainer: {
    width,
    height: height * 0.07,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  footerBtnContainer: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  profileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  profileBadge: {
    width: verticalScale(8),
    height: verticalScale(8),
    position: 'absolute',
    right: '25%',
    top: 0,
    backgroundColor: '#EE9826',
    borderRadius: verticalScale(4)
  },
  shoppingContainer: {
    width: '50%',
    height: '40%',
    position: 'relative'
  },
  shoppingBadgeContainer: {
    width: '40%',
    height: '50%',
    position: 'absolute',
    right: -scale(3),
    top: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shoppingBadgeStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    color: '#6178DE',
    fontSize: verticalScale(8)
  }
})
export default styles
