import { StyleSheet } from 'react-native'
import { alignment, colors, verticalScale, scale } from '../../../utils'

// We can use Dimensions module and use percentage from it as well; a decent usecase
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(90),
    marginBottom: verticalScale(15),
    borderRadius: verticalScale(3),
    borderWidth: verticalScale(1),
    borderColor: colors.lightHorizontalLine,
    flexDirection: 'row'
  },
  leftside: {
    height: '100%',
    width: '35%'
  },
  thumbnail: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: verticalScale(3),
    borderBottomLeftRadius: verticalScale(3)
  },
  rightside_container: {
    backgroundColor: colors.container,
    height: '100%',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: verticalScale(3),
    borderBottomRightRadius: verticalScale(3)
  },
  ratingContainer: {
    flexDirection: 'row'
  },
  badge: {
    backgroundColor: 'purple',
    position: 'absolute',
    borderRadius: scale(3),
    zIndex: 1,
    elevation: 1,
    top: 10,
    left: 10,
    ...alignment.PxSmall
  },
  rightside: {
    height: '80%',
    width: '85%',
    justifyContent: 'space-between'
  },

  row: {
    flexDirection: 'row'
  },
  rightside_top: {
    alignItems: 'flex-start'
  },
  special_row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  amount: {
    lineHeight: verticalScale(13),
    ...alignment.PTxSmall
  },
  product: {
    width: '95%',
    lineHeight: scale(17)
  },
  prevPrice: {
    alignSelf: 'flex-start'
  },
  prevPriceText: {
    color: colors.google,
    alignSelf: 'flex-start',
    paddingBottom: 0,
    marginBottom: 0,
    textAlignVertical: 'bottom',
    includeFontPadding: false
  }
})
export default styles
