import React, { useState, useEffect } from 'react'
import AppContainer from './src/routes/routes'
import * as Notifications from 'expo-notifications'
import { ApolloProvider } from '@apollo/client'
import { StatusBar, Platform } from 'react-native'
import { ConfigurationProvider } from './src/context/Configuration'
import { UserProvider } from './src/context/User'
import { colors } from './src/utils/colors'
import * as Font from 'expo-font'
import setupApolloClient from './src/apollo/index'
import FlashMessage from 'react-native-flash-message'
import { Spinner } from './src/components'

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  const [client, setupClient] = useState(null)

  useEffect(() => {
    loadAppData()
  }, [])

  async function loadAppData() {
    const client = await setupApolloClient()

    setupClient(client)
    await Font.loadAsync({
      'Poppins-Regular': require('./src/assets/font/Poppins/Poppins-Regular.ttf'),
      'Poppins-Bold': require('./src/assets/font/Poppins/Poppins-Bold.ttf')
    })

    await permissionForPushNotificationsAsync()

    setFontLoaded(true)
  }

  async function permissionForPushNotificationsAsync() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: colors.brownColor
      })
    }
  }

  if (fontLoaded && client) {
    return (
      <ApolloProvider client={client}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={colors.headerbackground}
        />
        <ConfigurationProvider>
          <UserProvider>
            <AppContainer />
          </UserProvider>
        </ConfigurationProvider>
        <FlashMessage position="top" />
      </ApolloProvider>
    )
  } else return <Spinner spinnerColor={colors.spinnerColor} />
}
