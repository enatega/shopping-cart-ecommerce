import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import UserContext from '../../context/User'
import { scale, colors } from '../../utils'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'

function BottomTab(props) {
  const navigation = useNavigation()
  const { isLoggedIn, cartCount, orders } = useContext(UserContext)
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainLanding')}
        style={[
          styles.footerBtnContainer,
          props.screen === 'HOME' && styles.active
        ]}>
        <View style={styles.imgContainer}>
          <SimpleLineIcons
            name="home"
            color={colors.fontSecondColor}
            size={scale(20)}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SearchResult')}
        style={[
          styles.footerBtnContainer,
          props.screen === 'SEARCH' && styles.active
        ]}>
        <View style={styles.imgContainer}>
          <Ionicons
            name="ios-search"
            size={scale(27)}
            color={colors.fontSecondColor}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (isLoggedIn) navigation.navigate('ProfileDashboard')
          else navigation.navigate('SignIn')
        }}
        style={[
          styles.footerBtnContainer,
          props.screen === 'PROFILE' && styles.active
        ]}>
        <View style={styles.profileContainer}>
          <SimpleLineIcons
            name="user"
            size={scale(20)}
            color={colors.fontSecondColor}
          />
          {isLoggedIn &&
            (orders
              ? orders.filter(o =>
                ['PENDING', 'DISPATCHED', 'ACCEPTED'].includes(o.orderStatus)
              ).length > 0
              : false) && <View style={styles.profileBadge} />}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ShoppingCart')}
        style={[
          styles.footerBtnContainer,
          props.screen === 'CART' && styles.active
        ]}>
        <View style={styles.shoppingContainer}>
          <Image
            source={require('../../assets/images/footer/shopping.png')}
            style={styles.imgResponsive}
            resizeMode="contain"
          />
          <View style={styles.shoppingBadgeContainer}>
            <Text style={styles.shoppingBadgeStyle}>x{cartCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default BottomTab
