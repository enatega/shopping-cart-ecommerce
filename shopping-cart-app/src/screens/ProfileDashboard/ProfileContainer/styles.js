import { verticalScale, scale } from '../../../utils/scaling'
import { fontStyles } from '../../../utils/fontStyles'
import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils'

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  profileContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileSubContainer: {
    width: '90%',
    height: '90%'
  },
  topProfileContent: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    ...alignment.MBxSmall
  },
  topProfileIconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  topProfileTextContainer: {
    justifyContent: 'center',
    width: '50%',
    ...alignment.MLxSmall
  },
  topProfileTextStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(16)
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  imgResponsive3: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: '#F7F7F7'
  },
  profieCenterContainer: {
    width: '100%',
    height: '90%',
    borderRadius: verticalScale(8)
  },
  profileCenterContainerTop: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconContainer: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImageContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImage: {
    width: verticalScale(100),
    height: verticalScale(100),
    borderRadius: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: verticalScale(3),
    borderColor: '#DDDDDD'
  },
  imgResponsive2: {
    width: '70%',
    height: '70%'
  },
  nameContainer: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(16)
  },
  placeContainer: {
    width: '100%',
    height: '8%',
    alignItems: 'center'
  },
  placeStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(12)
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    ...alignment.PLsmall,
    ...alignment.PRsmall
  },
  iconsStyle: {
    width: scale(20),
    height: scale(20),
    marginBottom: scale(4)
  },
  addressIcon: {
    width: '15%',
    height: '50%'
  },
  addressText: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: verticalScale(12)
  }
})
export default styles
