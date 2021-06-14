import { Dimensions, StyleSheet } from 'react-native'
import { colors, alignment, scale } from '../../utils'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  font: {
    width: '95%'
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  mainContainer: {
    backgroundColor: colors.themeBackground
  },
  dateContainer: {
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollViewContainer: {
    flex: 1
  },
  mainCardContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: colors.themeBackground,
    ...alignment.PTmedium
  },
  lineSubContainer: {
    width: '100%',
    height: 1,
    backgroundColor: colors.medHorizontalLine
  },
  cardContainer: {
    width: scale(320),
    height: height * 0.14,
    borderRadius: scale(8),
    flexDirection: 'row',
    borderWidth: scale(1),
    borderColor: colors.lightHorizontalLine,
    ...alignment.MTxSmall,
    ...alignment.MBxSmall,
    ...alignment.PRsmall
  },
  leftContainer: {
    width: '35%',
    height: '100%'
  },
  imgResponsive3: {
    width: '70%',
    height: '70%'
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  roundedBorder: {
    borderRadius: scale(8),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  rightContainer: {
    width: '65%',
    height: '100%',
    justifyContent: 'center',
    ...alignment.PLsmall
  },
  subRightContainer: {
    width: '95%',
    height: '90%'
  },
  titleContainer: {
    width: '100%',
    height: '33%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightArrowContainer: {
    width: '6%',
    height: '60%'
  },
  subTitleContainer: {
    marginTop: '-3%',
    width: '100%',
    height: '37%'
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  subActionsContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'flex-end'
  },
  // empty
  subContainerImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    ...alignment.PBlarge
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
