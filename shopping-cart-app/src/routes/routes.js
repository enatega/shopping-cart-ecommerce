import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import navigationService from './navigationService'
import * as Notifications from 'expo-notifications'
import { createDrawerNavigator } from '@react-navigation/drawer'
import * as Screen from '../screens'
import { MainMenu } from '../components'

const NavigationStack = createStackNavigator()
const MainStack = createStackNavigator()
const SideDrawer = createDrawerNavigator()

function Drawer() {
  return (
    <SideDrawer.Navigator
      initialRouteName="MainLanding"
      drawerContent={props => <MainMenu {...props} />}>
      <SideDrawer.Screen name="noDrawer" component={noDrawer} />
    </SideDrawer.Navigator>
  )
}
function noDrawer() {
  return (
    <NavigationStack.Navigator headerMode="none">
      <NavigationStack.Screen
        name="MainLanding"
        component={Screen.MainLanding}
      />
      <NavigationStack.Screen
        name="AddressList"
        component={Screen.AddressList}
      />
      <NavigationStack.Screen
        name="DeleteButton"
        component={Screen.DeleteButton}
      />
      <NavigationStack.Screen name="Checkout" component={Screen.Checkout} />
      <NavigationStack.Screen name="Payment" component={Screen.Payment} />
      <NavigationStack.Screen name="Paypal" component={Screen.Paypal} />
      <NavigationStack.Screen
        name="StripeCheckout"
        component={Screen.StripeCheckout}
      />
      <NavigationStack.Screen
        name="EditAddress"
        component={Screen.EditAddress}
      />
      <NavigationStack.Screen name="NewAddress" component={Screen.NewAddress} />
      <NavigationStack.Screen
        name="EditingProfile"
        component={Screen.EditingProfile}
      />
      <NavigationStack.Screen
        name="OrderDetail"
        component={Screen.OrderDetail}
      />
      <NavigationStack.Screen
        name="PreviousOrders"
        component={Screen.PreviousOrders}
      />
      <NavigationStack.Screen
        name="ProductDescription"
        component={Screen.ProductDescription}
      />
      <NavigationStack.Screen
        name="ProductListing"
        component={Screen.ProductListing}
      />
      <NavigationStack.Screen
        name="ProfileDashboard"
        component={Screen.ProfileDashboard}
      />
      <NavigationStack.Screen
        name="SearchResult"
        component={Screen.SearchResults}
      />
      <NavigationStack.Screen
        name="ShoppingCart"
        component={Screen.ShoppingCart}
      />
      <NavigationStack.Screen name="TrackOrder" component={Screen.TrackOrder} />
      <NavigationStack.Screen name="Review" component={Screen.Review} />
      <NavigationStack.Screen name="Category" component={Screen.Category} />
      <NavigationStack.Screen
        name="SubCategory"
        component={Screen.SubCategory}
      />
      <NavigationStack.Screen name="Favourite" component={Screen.Favourite} />

      <NavigationStack.Screen name="SignIn" component={Screen.SignIn} />
      <NavigationStack.Screen name="SignUp" component={Screen.SignUp} />
    </NavigationStack.Navigator>
  )
}

function AppContainer() {
  function _handleNotification(notification) {
    try {
      if (notification.origin === 'selected') {
        if (notification.data.order) {
          navigationService.navigate('OrderDetail', {
            _id: notification.data._id
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
      })
    })
    const subscription = Notifications.addNotificationResponseReceivedListener(
      _handleNotification
    )
    return () => subscription.remove()
  }, [])

  return (
    <NavigationContainer
      ref={ref => {
        navigationService.setGlobalRef(ref)
      }}>
      <MainStack.Navigator headerMode="none" initialRouteName="Drawer">
        <MainStack.Screen name="Drawer" component={Drawer} />
      </MainStack.Navigator>
    </NavigationContainer>
  )
}

export default AppContainer
