import { Dimensions, StyleSheet } from 'react-native'
import { alignment, colors } from '../../utils'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  container: {
    height: '100%',
    width: '100%',
    alignSelf: 'center'
  },
  body: {
    height: '95%',
    width: '100%',
    alignSelf: 'center'
  },

  // main
  main: {
    flex: 1,
    marginLeft: 0,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  searchBarContainer: {
    height: height * 0.1,
    width: '93%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainBodyContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.themeBackground
  },
  mainBody: {
    flex: 1,
    width: '94%'
  },
  mixed_text: {
    width: '80%',
    ...alignment.PTxSmall,
    ...alignment.PBxSmall
  },
  main_scroller: {
    height: '93%'
  },
  scrollContainer: {
    flexGrow: 1,
    ...alignment.PBlarge
  }
})
export default styles
