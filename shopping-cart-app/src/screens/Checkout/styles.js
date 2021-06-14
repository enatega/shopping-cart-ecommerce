import { StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../utils'

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    ...alignment.PTlarge,
    ...alignment.PBlarge
  },
  mainContainer: {
    backgroundColor: colors.themeBackground
  },
  body: {
    height: '100%',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  simpleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  productRow: {
    flexDirection: 'row',
    maxWidth: '85%'
  },
  main_top: {
    width: '100%',
    ...alignment.MBmedium
  },
  orders: {
    width: '100%'
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.horizontalLine
  },
  items: {
    width: '100%',
    ...alignment.PBsmall
  },
  deliveryDate: {
    ...alignment.PTxSmall,
    ...alignment.PBxSmall
  },
  padding: {
    ...alignment.PTxSmall
  },
  coupan: {
    width: '100%',
    ...alignment.PTsmall,
    ...alignment.PBsmall
  },
  coupanRow: {
    ...alignment.MTxSmall,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  coupanInput: {
    width: '73%'
  },
  coupanBtn: {
    width: '25%',
    height: scale(40)
  },
  address: {
    width: '100%',
    ...alignment.PTsmall
  },
  addressDetail: {
    ...alignment.PTxSmall
  },
  borderBottom: {
    ...alignment.PBsmall
  },
  main_bot: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.containerDark,
    borderRadius: scale(5),
    ...alignment.PTlarge,
    ...alignment.PBlarge
  },
  subtotal_container: {
    width: '90%',
    ...alignment.PBsmall
  },
  listItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text_bold: {
    fontWeight: '500'
  },
  total_container: {
    width: '90%',
    ...alignment.PTsmall,
    ...alignment.MBlarge
  },
  submit_container: {
    width: '90%'
  },
  // Paymeny
  dealContainer: {
    width: '100%',
    backgroundColor: colors.container,
    borderRadius: scale(5),
    ...alignment.PLsmall,
    ...alignment.PRsmall,
    ...alignment.PBxSmall,
    ...alignment.MBsmall,
    ...alignment.MTsmall
  },
  floatView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    ...alignment.PBxSmall
  },
  changeText: {
    width: '30%',
    height: '100%',
    ...alignment.PTxSmall,
    ...alignment.PBxSmall
  },
  iconStyle: {
    height: scale(15),
    width: scale(25),
    ...alignment.MRsmall
  }
})
export default styles
