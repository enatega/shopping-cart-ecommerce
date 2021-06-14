import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../utils'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  mainContainer: {
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  tabContainer: {
    width: '90%',
    height: '8%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerText: {
    height: scale(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightHorizontalLine
  },
  categoryContainer: {
    flexGrow: 1,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
    ...alignment.MTlarge
  },
  spacer: {
    marginRight: width * 0.1,
    ...alignment.MBlarge
  }
})
export default styles
