import { Dimensions, StyleSheet } from 'react-native'
import { alignment, fontStyles, colors, scale } from '../../utils'
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  line: {
    width: '100%',
    borderBottomColor: colors.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...alignment.MTsmall,
    ...alignment.MBsmall
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  mainContainer: {
    backgroundColor: colors.themeBackground
  },
  contentStyle: {
    flexGrow: 1
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  caroselContainer: {
    width: '100%',
    height: height * 0.1,
    alignItems: 'center'
  },
  caroselSubContainer: {
    width: '80%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  caroselTitleContainer: {
    width: '70%',
    height: '100%',
    justifyContent: 'center'
  },
  caroselPriceContainer: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.PxSmall
  },
  caroselPriceSubContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.Psmall,
    backgroundColor: colors.grayLinesColor
  },
  mainScrollViewContainer: {
    backgroundColor: colors.themeBackground
  },
  textStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(12)
  },
  boldStyle: {
    fontFamily: fontStyles.PoppinsBold
  },
  priceColor: {
    color: colors.textBlueColor
  },
  caroselMainImgCnt: {
    height: height * 0.5,
    width: '100%',
    backgroundColor: 'white'
  },
  scrollViewStyle: {
    height: height * 0.08
  },
  caroselItems: {
    width: width * 0.15,
    height: height * 0.08,
    marginRight: width * 0.01,
    marginLeft: width * 0.01,
    marginTop: width * 0.01
  },
  shoppingCartContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: scale(20),
    marginBottom: scale(20)
  },
  outOfStockContainer: {
    width: '90%',
    height: scale(40),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
    backgroundColor: colors.medHorizontalLine,
    ...alignment.MTlarge,
    ...alignment.MBlarge
  },
  spacer: {
    ...alignment.MTlarge
  },
  smallSpacer: {
    ...alignment.MTxSmall
  },
  variationContainer: {
    width: '90%',
    alignSelf: 'center'
  },
  // REview Styling
  review: {
    width: '90%',
    alignSelf: 'center'
  },
  reviewerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '25%'
  },
  dateReview: {
    width: '100%',
    textAlign: 'left',
    ...alignment.PTsmall,
    ...alignment.PBxSmall
  },
  reviewHeader: {
    alignSelf: 'center',
    width: '90%'
  },
  // modal
  crossBtn: {
    backgroundColor: colors.white,
    borderRadius: 50,
    ...alignment.Psmall
  },
  headerZoom: {
    position: 'absolute',
    top: scale(20),
    right: scale(10),
    ...alignment.MTlarge
  }
})
export default styles
