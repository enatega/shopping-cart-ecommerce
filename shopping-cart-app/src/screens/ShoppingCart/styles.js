import { StyleSheet } from 'react-native'
import { fontStyles, colors, scale, alignment } from '../../utils'

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  mainContainer: {
    backgroundColor: colors.themeBackground
  },
  subContainer: {
    flexGrow: 1,
    ...alignment.Psmall
  },
  spacer: {
    marginTop: scale(10)
  },
  textStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(13)
  },
  totalStyle: {
    color: colors.blueColor
  },
  priceBox: {
    width: '100%',
    ...alignment.Psmall
  },
  summaryContainer: {
    width: '100%',
    backgroundColor: colors.containerDark,
    alignSelf: 'center',
    padding: scale(10),
    justifyContent: 'flex-end',
    borderRadius: scale(10)
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lineStyle: {
    width: '99%',
    height: 1,
    backgroundColor: colors.horizontalLine,
    alignSelf: 'center'
  },
  // empty
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
    width: scale(100),
    height: scale(100)
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
