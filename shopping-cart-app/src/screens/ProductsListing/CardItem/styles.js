import { Dimensions } from 'react-native'
import { verticalScale, scale } from '../../../utils/scaling'
import { colors } from '../../../utils/colors'
import { fontStyles } from '../../../utils/fontStyles'
const { height, width } = Dimensions.get('window')

export default {
  cardContainer: {
    width: width * 0.45,
    height: height * 0.3,
    backgroundColor: 'white',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    borderRadius: verticalScale(5)
  },
  cardTop: {
    width: '100%',
    height: '60%'
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: verticalScale(5)
  },
  textContainer: {
    height: '10%',
    justifyContent: 'flex-end'
  },
  textStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(12),
    marginLeft: '5%'
  },
  botContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  ratingContainer: {
    width: '60%',
    height: '40%',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  ratingStyle: {
    marginLeft: '8%'
  },
  ratingNumber: {
    marginBottom: '-10%',
    marginLeft: '3%',
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(10)
  },
  priceContainer: {
    marginTop: '5%',
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceStyle: {
    marginTop: verticalScale(4),
    fontSize: verticalScale(14),
    fontFamily: fontStyles.PoppinsRegular,
    color: colors.textBlueColor
  }
}
