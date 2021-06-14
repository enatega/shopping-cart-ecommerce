import { scale } from '../../utils/scaling'
import { Dimensions, StyleSheet } from 'react-native'
import { alignment, colors } from '../../utils'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  container: {
    backgroundColor: colors.themeBackground
  },
  categoryContainer: {
    flexGrow: 1,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
    ...alignment.MTlarge
  },
  productCard: {
    marginRight: width * 0.1,
    height: scale(230),
    width: width * 0.4,
    ...alignment.MBlarge
  },
  subContainerImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.MBlarge
  },
  image: {
    width: scale(130),
    height: scale(130)
  },
  descriptionEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.Plarge
  },
  emptyButton: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
})
export default styles
