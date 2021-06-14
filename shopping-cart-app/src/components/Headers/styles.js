import { fontStyles } from '../../utils/fontStyles'
import { scale } from '../../utils/scaling'
import { colors } from '../../utils/colors'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default {
  container: {
    width: width,
    height: height * 0.07,
    backgroundColor: colors.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  },
  subContainer: {
    width: '100%',
    height: '80%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    flex: 1,
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(18)
  },
  titleContainer: {
    flexDirection: 'row',
    width: '85%'
  },
  iconStyle: {
    width: scale(20),
    height: scale(20)
  },
  rightTitle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(14)
  },
  rightContainer: {
    width: '15%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
