import { Dimensions } from 'react-native'
import { scale } from '../../../utils/scaling'
import { colors } from '../../../utils/colors'
import { fontStyles } from '../../../utils/fontStyles'
const { height } = Dimensions.get('window')

export default {
  modalContainer: {
    height: height * 0.3,
    backgroundColor: colors.whiteColor,
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '90%',
    height: '80%'
  },
  titleContainer: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(16)
  },
  subtitleStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(12),
    color: colors.darkGrayText
  },
  inputContainer: {
    width: '100%',
    height: '25%',
    marginTop: '5%',
    borderRadius: scale(3),
    backgroundColor: colors.backgroudGray
  },
  brownColor: {
    backgroundColor: colors.brownColor
  },
  btnContainer: {
    width: '100%',
    height: '25%',
    marginTop: scale(20),
    borderRadius: scale(3),
    backgroundColor: colors.lightGrayColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(16),
    color: colors.whiteColor
  }
}
