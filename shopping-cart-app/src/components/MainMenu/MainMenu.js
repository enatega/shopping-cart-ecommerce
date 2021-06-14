import React, { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimpleLineIcons } from '@expo/vector-icons'
import UserContext from '../../context/User'
import { scale, colors, alignment } from '../../utils'
import { TextDefault } from '../Text'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import Spinner from '../Spinner/Spinner'

const navItems = [
  {
    title: 'Home',
    icon: 'home',
    navigateTo: 'MainLanding',
    isAuth: false
  },
  {
    title: 'Profile',
    icon: 'user',
    navigateTo: 'ProfileDashboard',
    isAuth: true
  },
  {
    title: 'Search',
    icon: 'magnifier',
    navigateTo: 'SearchResult',
    isAuth: false
  },
  {
    title: 'Address',
    icon: 'location-pin',
    navigateTo: 'AddressList',
    isAuth: true
  },
  {
    title: 'Categories',
    icon: 'organization',
    navigateTo: 'Category',
    isAuth: false
  },
  {
    title: 'Previous Orders',
    icon: 'layers',
    navigateTo: 'PreviousOrders',
    isAuth: true
  }
]

function MainMenu(props) {
  const navigation = useNavigation()
  const { isLoggedIn, logout, profile, loadingProfile } = useContext(
    UserContext
  )
  if (loadingProfile) return <Spinner />
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          {isLoggedIn && profile && (
            <View style={styles.profileSubContainer}>
              <View style={styles.profileImage}>
                <SimpleLineIcons
                  name="user"
                  size={scale(30)}
                  color={colors.fontBrown}
                />
              </View>
              <View style={styles.profileTitle}>
                <TextDefault
                  numberOfLines={2}
                  textColor={colors.fontMainColor}
                  H4
                  center>
                  {profile.name}
                </TextDefault>
              </View>
            </View>
          )}
          {!isLoggedIn && (
            <View style={styles.loginContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate('SignIn')
                }}>
                <TextDefault
                  textColor={colors.fontMainColor}
                  H5
                  style={[alignment.PTmedium, alignment.PBmedium]}>
                  {'Login/Create Account'}
                </TextDefault>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.middleSubContainer}>
            {navItems.map((item, ind) => (
              <TouchableOpacity
                activeOpacity={0}
                onPress={() => {
                  if (item.isAuth && !isLoggedIn) {
                    props.navigation.navigate('SignIn')
                  } else {
                    props.navigation.navigate(item.navigateTo)
                  }
                }}
                key={ind}
                style={styles.navItemContainer}>
                <View style={styles.leftContainer}>
                  <SimpleLineIcons
                    name={item.icon}
                    size={scale(17)}
                    color={colors.iconColor}
                  />
                </View>
                <View style={styles.rightContainer}>
                  <TextDefault
                    textColor={colors.fontMainColor}
                    H4
                    style={alignment.PLxSmall}>
                    {item.title}
                  </TextDefault>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {isLoggedIn && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              activeOpacity={0}
              onPress={() => {
                logout()
                navigation.dispatch(DrawerActions.closeDrawer())
              }}
              style={styles.bottomSubContainer}>
              <SimpleLineIcons
                name="logout"
                size={scale(20)}
                color={colors.pinkColor}
              />
              <View style={styles.signoutContainerText}>
                <TextDefault
                  numberOfLines={1}
                  textColor={colors.pinkColor}
                  style={styles.signoutContainerStyle}
                  H4>
                  {'Sign Out'}
                </TextDefault>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default MainMenu
