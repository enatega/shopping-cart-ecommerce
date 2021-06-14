import { Dimensions, StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../utils'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  grayBackground: {
    backgroundColor: colors.themeBackground
  },
  contentContainer: {
    flexGrow: 1,
    width: '90%',
    alignSelf: 'center',
    ...alignment.PBsmall
  },
  subContainerImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center'
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
  },
  cardContainer: {
    width: '100%',
    height: height * 0.14,
    borderRadius: scale(8),
    flexDirection: 'row',
    borderWidth: scale(1),
    borderColor: colors.medHorizontalLine,
    ...alignment.MTxSmall,
    ...alignment.MBxSmall
  },
  leftContainer: {
    width: '40%',
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
    marginLeft: '5%',
    width: '55%',
    height: '100%',
    justifyContent: 'center'
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
    height: '100%',
    width: '10%',
    justifyContent: 'center'
  },
  subTitleContainer: {
    marginTop: '-3%',
    width: '100%',
    height: '17%'
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  subActionsContainer: {
    width: '100%',
    height: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionContainer: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  // empty
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.MBlarge
  }
})
export default styles
