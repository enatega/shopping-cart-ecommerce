import { Dimensions } from 'react-native'
import { verticalScale, scale } from '../../../utils/scaling'
import { colors } from '../../../utils/colors'
import { fontStyles } from '../../../utils/fontStyles'
import { alignment } from '../../../utils'
const { height } = Dimensions.get('window')

export default {
  scrollViewContainer: {
    flex: 1
  },
  mainCardContainer: {
    flexGrow: 1,
    alignItems: 'center'
  },
  cardContainer: {
    width: '90%',
    height: height * 0.14,
    marginBottom: verticalScale(4),
    marginTop: verticalScale(4),
    borderRadius: verticalScale(8),
    flexDirection: 'row',
    borderWidth: verticalScale(1),
    borderColor: '#EEEEEE'
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
    borderRadius: verticalScale(8),
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
  titleStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(14)
  },
  rightArrowContainer: {
    height: '60%'
  },
  subTitleContainer: {
    marginTop: '-3%',
    width: '100%',
    height: '17%'
  },
  subTtitleStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(10),
    color: '#9B9B9B'
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
  statusStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(12),
    color: colors.blueColor
  },
  actionContainer: {
    width: '40%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%',
    borderRadius: verticalScale(4),
    backgroundColor: colors.buttonBackground
  },
  actionStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(12),
    color: colors.whiteColor
  },
  // empty
  subContainerImage: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.MBlarge
  },
  image: {
    width: scale(50),
    height: scale(50)
  }
}
