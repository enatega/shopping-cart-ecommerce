import { StyleSheet } from 'react-native'
import { verticalScale, scale, alignment } from '../../utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  profileContainer: {
    width: '100%',
    height: '30%',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  loginContainer: {
    width: '80%',
    height: '70%',
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: verticalScale(5)
  },
  profileSubContainer: {
    width: '85%',
    height: '85%',
    backgroundColor: '#F7F7F7',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: scale(5),
    ...alignment.PxSmall
  },
  profileImage: {
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: verticalScale(30),
    borderWidth: verticalScale(2),
    borderColor: '#DDDDDD',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgResponsive3: {
    width: '50%',
    height: '50%'
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  profileTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePlace: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  middleContainer: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  middleSubContainer: {
    width: '90%',
    height: '80%'
  },
  navItemContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    alignItems: 'center',
    ...alignment.MBxSmall
  },
  navItemContainerImage: {
    width: '100%',
    height: '8%',
    marginTop: verticalScale(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navItemImg: {
    height: '100%',
    width: '25%'
  },
  bottomContainer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomSubContainer: {
    width: '85%',
    height: '80%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  signoutContainerImg: {
    width: '15%',
    height: '40%'
  },
  signoutContainerText: {
    width: '85%',
    height: '50%',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  signoutContainerStyle: {
    width: '100%',
    ...alignment.PLmedium
  },
  leftContainer: {
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainer: {
    height: '80%',
    width: '85%',
    justifyContent: 'center'
  }
})
export default styles
