import { verticalScale, scale, colors, alignment } from '../../utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  body: {
    // adjust body height in order to accomodate footer
    height: '85%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.backgroudGray
  },
  backImg: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // header
  header: {
    height: '8%',
    width: '100%',
    backgroundColor: colors.whiteColor,
    borderBottomWidth: verticalScale(1),
    borderColor: colors.grayLinesColor,
    alignItems: 'center'
  },
  headerRow: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    width: '60%'
  },
  headerBtn: {
    width: '30%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  // main
  main: {
    height: '100%',
    width: '95%',
    paddingTop: verticalScale(10)
  },
  mainScroll: {
    height: '100%',
    width: '100%'
  },
  // Empty View
  emptyContainer: {
    width: '100%',
    backgroundColor: colors.container,
    borderRadius: scale(5),
    alignItems: 'center',
    ...alignment.MBmedium,
    ...alignment.PTmedium,
    ...alignment.PBmedium
  },
  address: {
    ...alignment.MTmedium,
    ...alignment.MBsmall,
    ...alignment.PLxSmall,
    width: '90%',
    justifyContent: 'center'
  },
  btnContainer: {
    width: '90%',
    justifyContent: 'flex-start'
  },
  unselectedButton: {
    height: scale(40),
    width: '100%',
    backgroundColor: colors.brownColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(3)
  }
})
export default styles
