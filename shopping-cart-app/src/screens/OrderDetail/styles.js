import { StyleSheet } from 'react-native'
import { alignment, colors, scale, verticalScale } from '../../utils'

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  itemContainer: {
    backgroundColor: colors.backgroudGray
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.medHorizontalLine,
    ...alignment.MTxSmall,
    ...alignment.MBxSmall
  },
  cardContainer: {
    backgroundColor: colors.themeBackground,
    width: '100%',
    height: scale(80),
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.MTxSmall,
    ...alignment.MBxSmall
  },
  card: {
    backgroundColor: colors.container,
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    borderRadius: scale(8)
  },
  cardLeftContainer: {
    width: '30%',
    borderTopLeftRadius: verticalScale(8),
    borderBottomLeftRadius: verticalScale(8)
  },
  cardRightContainer: {
    width: '65%',
    justifyContent: 'space-between',
    ...alignment.MLxSmall,
    ...alignment.PTxSmall,
    ...alignment.PBxSmall
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: verticalScale(8),
    borderBottomLeftRadius: verticalScale(8)
  },
  amountContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...alignment.MTxSmall,
    ...alignment.MBxSmall
  },
  quantityContainer: {
    // width: '30%',
    justifyContent: 'center'
  },
  priceContainer: {
    maxWidth: '60%',
    justifyContent: 'center'
  },
  deliverContainer: {
    backgroundColor: colors.backgroudGray,
    justifyContent: 'center',
    ...alignment.PTlarge,
    ...alignment.PBlarge
  },
  deliverSubContainer: {
    width: '100%',
    ...alignment.MLmedium,
    ...alignment.MRmedium
  },
  paymentContainer: {
    backgroundColor: colors.backgroudGray,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    ...alignment.PTlarge,
    ...alignment.PBlarge
  },
  paymentSubContainer: {
    width: '90%'
  },
  twoItems: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalContainer: {
    backgroundColor: colors.backgroudGray,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    ...alignment.PTlarge,
    ...alignment.PBlarge
  },
  totalSubContainer: {
    width: '90%',
    justifyContent: 'center'
  },
  trackOrderContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroudGray,
    ...alignment.PTlarge,
    ...alignment.PBlarge
  },
  buttonText: {
    width: '90%',
    alignSelf: 'center'
  },
  trackOrderSubContainer: {
    width: '90%',
    backgroundColor: colors.whiteColor,
    justifyContent: 'center',
    borderRadius: scale(4),
    height: scale(80)
  },
  trackStyle: {
    width: '90%',
    height: '60%',
    backgroundColor: colors.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(4)
  },
  actionContainer: {
    // width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: scale(4),
    backgroundColor: colors.buttonBackground,
    ...alignment.PLxSmall,
    ...alignment.PRxSmall
  }
})
export default styles
