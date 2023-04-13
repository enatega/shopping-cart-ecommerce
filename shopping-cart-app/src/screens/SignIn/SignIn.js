import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native'
import styles from './styles'
import * as Google from 'expo-auth-session/providers/google'
import { login } from '../../apollo/server'
import * as Notifications from 'expo-notifications'
import { colors, scale } from '../../utils'
import * as AuthSession from 'expo-auth-session'
import { TextDefault, Spinner } from '../../components'
import TextField from '../../ui/Textfield/Textfield'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons'

import getEnvVars from '../../../environment'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as AppleAuthentication from 'expo-apple-authentication'
import { useMutation, gql } from '@apollo/client'
import UserContext from '../../context/User'
import { FlashMessage } from '../../components/FlashMessage/FlashMessage'
import MainBtn from '../../ui/Buttons/MainBtn'
import AlternateBtn from '../../ui/Buttons/AlternateBtn'

const {
  IOS_CLIENT_ID_GOOGLE,
  ANDROID_CLIENT_ID_GOOGLE,
  Expo_CLIENT_ID_GOOGLE
} = getEnvVars()

const LOGIN = gql`
  ${login}
`

function SignIn(props) {
  const navigation = useNavigation()
  const route = useRoute()
  const cartAddress = route.params?.backScreen ?? null
  const [email, setEmail] = useState('john_doe@gmail.com')
  const [password, setPassword] = useState('12345678')
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [loginButton, loginButtonSetter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [enableApple, setEnableApple] = useState(false)
  const { setTokenAsync } = useContext(UserContext)

  const [mutate] = useMutation(LOGIN, { onCompleted, onError })

  useEffect(() => {
    checkIfSupportsAppleAuthentication()
  }, [])

  function showModal() {
    setModalVisible(true)
  }

  function hideModal() {
    setModalVisible(false)
  }

  async function checkIfSupportsAppleAuthentication() {
    setEnableApple(await AppleAuthentication.isAvailableAsync())
  }

  function validateCredentials() {
    let result = true
    setEmailError(null)
    setPasswordError(null)
    console.log('email', email, 'password', password)
    if (!email) {
      setEmailError('Email is required')
      result = false
    } else {
      const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
      const phoneRegex = /^[+]\d{6,15}$/
      if (emailRegex.test(email) !== true && phoneRegex.test(email) !== true) {
        setEmailError('Invalid Email/Phone')
        result = false
      }
    }
    if (!password) {
      setPasswordError('Password is required')
      result = false
    }
    return result
  }
  async function onCompleted(data) {
    // console.log('login: ', data)
    if (data.login.is_Active == false) {
      FlashMessage({
        message: "Can't Login! This Account is deleted!",
        type: 'warning',
        position: 'top'
      })
      setLoading(false)
    } else
      try {
        // const trackingOpts = {
        //     id: data.login.userId,
        //     usernameOrEmail: data.login.email
        // }
        // Analytics.identify(data.login.userId, trackingOpts)
        // Analytics.track(Analytics.events.USER_LOGGED_IN, trackingOpts)
        await setTokenAsync(data.login.token)
        if (cartAddress === 'Cart') navigation.goBack()
        else navigation.navigate('MainLanding')
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
  }
  function onError(error) {
    try {
      console.log('graphql', error.message)
      FlashMessage({ message: error.message, type: 'warning', position: 'top' })
      loginButtonSetter(null)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const [
    googleRequest,
    googleResponse,
    googlePromptAsync
  ] = Google.useAuthRequest({
    expoClientId: Expo_CLIENT_ID_GOOGLE,
    iosClientId: IOS_CLIENT_ID_GOOGLE,
    iosStandaloneAppClientId: IOS_CLIENT_ID_GOOGLE,
    androidClientId: ANDROID_CLIENT_ID_GOOGLE,
    androidStandaloneAppClientId: ANDROID_CLIENT_ID_GOOGLE,
    //redirectUrl: `${AuthSession.OAuthRedirect}:/oauth2redirect/google`,
    scopes: ['profile', 'email'],
    ...{ useProxy: true }
  })

  const googleSignUp = () => {
    if (googleResponse?.type === 'success') {
      const { authentication } = googleResponse
      console.log(authentication.accessToken)
      ;(async () => {
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
          {
            headers: { Authorization: `Bearer ${authentication.accessToken}` }
          }
        )
        const googleUser = await userInfoResponse.json()
        const user = {
          phone: '',
          email: googleUser.email,
          password: '',
          name: googleUser.name,
          picture: googleUser.picture,
          type: 'google'
        }
        mutateLogin(user)
      })()
    }
  }

  useEffect(() => {
    googleSignUp()
  }, [googleResponse])

  async function mutateLogin(user) {
    try {
      setLoading(true)
      let notificationToken = null
      const {
        status: existingStatus
      } = await Notifications.getPermissionsAsync()
      if (existingStatus === 'granted') {
        notificationToken = await Notifications.getExpoPushTokenAsync()
      }
      mutate({
        variables: { ...user, notificationToken: notificationToken.data }
      })
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  function renderGoogle() {
    return (
      <View style={[styles.socialBtnsView, styles.googleBtn]}>
        {loading && loginButton === 'Google' ? (
          <Spinner backColor="rgba(0,0,0,0.1)" spinnerColor={colors.white} />
        ) : (
          <TouchableOpacity
            activeOpacity={0}
            onPressIn={() => {
              loginButtonSetter('Google')
            }}
            disabled={!googleRequest}
            onPress={() => googlePromptAsync()}
            style={styles.socialBtn}>
            <View style={styles.bgCircle}>
              <EvilIcons
                name="sc-google-plus"
                size={scale(20)}
                color={colors.google}
              />
            </View>
            <TextDefault style={styles.fbText} textColor={colors.white} H5>
              {'Signin with Google'}
            </TextDefault>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  function renderApple() {
    if (loading && loginButton === 'Apple') {
      return (
        <View style={[styles.socialBtnsView, styles.appleBtn]}>
          <Spinner backColor="rgba(0,0,0,0.1)" spinnerColor={'#FFF'} />
        </View>
      )
    }
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={3}
        style={styles.appleBtn}
        onPress={async () => {
          loginButtonSetter('Apple')
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL
              ]
            })
            if (credential) {
              const user = {
                appleId: credential.user,
                phone: '',
                email: credential.email,
                password: '',
                name:
                  credential.fullName.givenName +
                  ' ' +
                  credential.fullName.familyName,
                picture: '',
                type: 'apple'
              }
              mutateLogin(user)
            }
          } catch (e) {
            if (e.code === 'ERR_CANCELED') {
              // handle that the user canceled the sign-in flow
              loginButtonSetter(null)
            } else {
              // handle other errors
              loginButtonSetter(null)
            }
          }
        }}
      />
    )
  }

  function rennderLogin() {
    return (
      <MainBtn
        loading={loading && loginButton === 'Login'}
        onPress={async () => {
          loginButtonSetter('Login')
          const user = {
            email: email,
            password: password,
            type: 'default'
          }

          if (validateCredentials()) {
            mutateLogin(user)
          }
        }}
        text="Sign In"
      />
    )
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <ForgotPassword modalVisible={modalVisible} hideModal={hideModal} />
            <View style={styles.body}>
              <View style={styles.bodyHeader}>
                <SimpleLineIcons
                  name="user"
                  size={scale(20)}
                  color={colors.fontSecondColor}
                />
                <TextDefault
                  style={styles.headerText}
                  textColor={colors.fontMainColor}
                  H5>
                  {'Sign In'}
                </TextDefault>
              </View>
              <View style={styles.bodyContainer}>
                <ImageBackground
                  style={styles.bodyContainerBackground}
                  source={require('../../assets/images/formBackground.png')}>
                  <View style={styles.bcTexts}>
                    <TextDefault textColor={colors.fontMainColor} H3>
                      {'Hello Guest!'}
                    </TextDefault>
                    <TextDefault textColor={colors.fontMainColor}>
                      {'Sign In'}
                    </TextDefault>
                  </View>
                  <View style={styles.bcMain}>
                    <View>
                      <TextField
                        error={!!emailError}
                        placeholder="Email"
                        value={email}
                        onChange={event => {
                          setEmail(event.nativeEvent.text.toLowerCase().trim())
                        }}
                      />
                      {!!emailError && (
                        <TextDefault textColor={colors.errorColor} small>
                          {emailError}
                        </TextDefault>
                      )}
                    </View>
                    <View>
                      <TextField
                        error={!!passwordError}
                        placeholder="Password"
                        password={true}
                        value={password}
                        onChange={event => {
                          setPassword(event.nativeEvent.text.trim())
                        }}
                      />
                      {!!passwordError && (
                        <TextDefault textColor={colors.errorColor} small>
                          {passwordError}
                        </TextDefault>
                      )}
                    </View>
                    {rennderLogin()}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => showModal()}>
                      <TextDefault textColor={colors.google}>
                        {'Forgot password ?'}
                      </TextDefault>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.bcSocialBox}>
                    {renderGoogle()}
                    {enableApple && renderApple()}
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.bodyFooter}>
                <AlternateBtn
                  onPress={() => navigation.navigate('SignUp')}
                  text="Don't have account ?"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn
