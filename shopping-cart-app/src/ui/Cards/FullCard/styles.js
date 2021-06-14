import { verticalScale } from '../../../utils/scaling'
import { colors } from '../../../utils/colors'
import { fontStyles } from '../../../utils/fontStyles'

// We can use Dimensions module and use percentage from it as well; a decent usecase
export default {
  container: {
    width: '100%',
    height: verticalScale(90),
    marginBottom: verticalScale(15),
    borderRadius: verticalScale(3),
    borderWidth: verticalScale(1),
    borderColor: colors.backgroudGray,
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
    backgroundColor: colors.secondaryWhiteColor,
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
  votesCount: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(8),
    paddingTop: verticalScale(3),
    paddingLeft: verticalScale(3)
  },
  badge: {
    backgroundColor: 'purple',
    color: 'white',
    width: '30%',
    position: 'absolute',
    textAlign: 'center',
    lineHeight: verticalScale(18),
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(11),
    borderRadius: verticalScale(3),
    zIndex: 1,
    elevation: 1,
    top: 10,
    left: 10
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
    justifyContent: 'space-between'
  },
  qty: {
    fontFamily: fontStyles.PoppinsRegular,
    color: colors.primaryBlackColor,
    fontSize: verticalScale(13),
    fontWeight: '500'
  },
  amount: {
    fontFamily: fontStyles.PoppinsRegular,
    color: colors.textBlueColor,
    fontSize: verticalScale(13),
    fontWeight: '500',
    lineHeight: verticalScale(13),
    paddingTop: verticalScale(5)
  },
  product: {
    width: '95%',
    fontFamily: fontStyles.PoppinsRegular,
    color: colors.primaryBlackColor,
    fontSize: verticalScale(13),
    lineHeight: verticalScale(14.5)
  },
  by: {
    fontFamily: fontStyles.PoppinsRegular,
    color: colors.primaryBlackColor,
    fontSize: verticalScale(11)
  },
  brand: {
    fontFamily: fontStyles.PoppinsRegular,
    color: colors.brownColor,
    fontSize: verticalScale(11)
  },
  prevPrice: {
    alignSelf: 'flex-start'
  },
  prevPriceText: {
    color: colors.googleRedColor,
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(9),
    lineHeight: verticalScale(10),
    alignSelf: 'flex-start',
    paddingBottom: 0,
    marginBottom: 0
  }
}
