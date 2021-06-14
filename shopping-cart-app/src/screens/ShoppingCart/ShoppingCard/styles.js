import { fontStyles, colors, scale, alignment } from '../../../utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.MBsmall
  },
  removeContainer: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.horizontalLine,
    backgroundColor: colors.container,
    borderRadius: scale(5),
    overflow: 'hidden',
    ...alignment.PRsmall
  },
  imgContainer: {
    width: '30%',
    height: '100%'
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  itemContainer: {
    flex: 1,
    ...alignment.MLsmall,
    ...alignment.PTsmall,
    ...alignment.PBxSmall
  },
  itemDetailContainer: {
    width: '100%'
  },
  titleStyle: {
    fontSize: scale(12),
    fontFamily: fontStyles.PoppinsBold
  },
  descStyle: {
    fontSize: scale(10),
    fontFamily: fontStyles.PoppinsRegular,
    color: colors.brownColor
  },
  quantityContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  sizeStyle: {
    fontSize: scale(16),
    fontFamily: fontStyles.PoppinsBold
  },
  quantitySelContainer: {
    flexDirection: 'row'
  },
  quantityIconStyle: {
    ...alignment.PLlarge,
    ...alignment.PRlarge
  },
  quantityTextStyle: {
    marginLeft: scale(30),
    marginRight: scale(30),
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(15)
  },
  bottomContainer: {
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  likeContainer: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  likeTextStyle: {
    marginLeft: scale(5),
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(10)
  },
  priceContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    ...alignment.MTxSmall
  },
  actualPriceStyle: {
    textDecorationLine: 'line-through',
    fontFamily: fontStyles.PoppinsBold,
    fontSize: scale(14),
    color: colors.googleRedColor
  },
  discountedPriceStyle: {
    marginLeft: scale(10),
    fontFamily: fontStyles.PoppinsBold,
    fontSize: scale(14),
    color: colors.blueColor
  }
})
export default styles
