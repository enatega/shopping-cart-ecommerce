import React, { useState, useContext } from 'react'
import {
  View,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import * as Notifications from 'expo-notifications';
import styles from './styles'
import { colors, alignment } from '../../utils'
import TextField from '../../ui/Textfield/Textfield'
import MainBtn from '../../ui/Buttons/MainBtn'
import AlternateBtn from '../../ui/Buttons/AlternateBtn'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation, gql } from '@apollo/client'
import { TextDefault, FlashMessage } from '../../components'
import UserContext from '../../context/User'
import { createUser } from '../../apollo/server'
import { useNavigation } from '@react-navigation/native'

const CREATEUSER = gql`
  ${createUser}
`

function SignUp(props) {
  const navigation = useNavigation()
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [phoneError, setPhoneError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { setTokenAsync } = useContext(UserContext)

  const [mutate] = useMutation(CREATEUSER, { onCompleted, onError })

  function validateCredentials() {
    let result = true

    setEmailError(null)
    setPasswordError(null)
    setPhoneError(null)
    setNameError(null)
    const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email.trim())) {
      setEmailError('Provide a valid email address')
      result = false
    }
    if (!password) {
      setPasswordError('Password is required')
      result = false
    }
    const phoneRegex = /^\d{11,15}$/
    if (!phoneRegex.test(phone)) {
      setPhoneError('Provide a valid phone number')
      result = false
    }
    const nameRegex = /([a-zA-Z]{3,30}\s*)+/
    if (!nameRegex.test(fullname)) {
      setNameError('Full name is required')
      result = false
    }
    return result
  }

  async function onCompleted(data) {
    try {
      //   const trackingOpts = {
      //     id: data.createUser.userId,
      //     usernameOrEmail: data.createUser.email
      //   }
      //   Analytics.identify(data.createUser.userId, trackingOpts)
      //   Analytics.track(Analytics.events.USER_CREATED_ACCOUNT, trackingOpts)
      setTokenAsync(data.createUser.token)
      navigation.navigate('MainLanding')
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  function onError(error) {
    try {
      FlashMessage({ message: error.message, type: 'warning', position: 'top' })
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  async function mutateLogin(user) {
    setLoading(true)
    let notificationToken = null
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    if (existingStatus === 'granted') {
      notificationToken = await Notifications.getExpoPushTokenAsync()
    }
    mutate({ variables: { ...user, notificationToken: notificationToken.data } })
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.flex}>
          <View style={styles.container}>
            <View style={styles.body}>
              <View style={styles.header}>
                <TextDefault
                  textColor={colors.fontMainColor}
                  H5
                  style={{ ...alignment.PLsmall }}>
                  {'Sign Up'}
                </TextDefault>
                <AlternateBtn
                  onPress={() =>
                    props.navigation.navigate('noDrawer', {
                      screen: 'MainLanding'
                    })
                  }
                  text="Continue as a Guest"
                />
              </View>
              <View style={styles.main}>
                <ImageBackground
                  style={styles.bodyContainerBackground}
                  source={require('../../assets/images/formBackground.png')}
                  resizeMode="cover">
                  <View style={styles.mainTop}>
                    <TextDefault textColor={colors.fontMainColor} H4>
                      {'Hello Guest'}
                    </TextDefault>
                    <TextDefault textColor={colors.fontMainColor}>
                      {'Sign Up'}
                    </TextDefault>
                  </View>
                  <View style={styles.mainMid}>
                    <View style={alignment.MBsmall}>
                      <TextField
                        error={!!nameError}
                        placeholder="Full Name"
                        onChange={event => {
                          setFullname(
                            event.nativeEvent.text.toLowerCase().trim()
                          )
                        }}
                      />
                      {!!nameError && (
                        <TextDefault textColor={colors.errorColor} small>
                          {nameError}
                        </TextDefault>
                      )}
                    </View>
                    <View style={alignment.MBsmall}>
                      <TextField
                        error={!!emailError}
                        placeholder="Email"
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
                    <View style={alignment.MBsmall}>
                      <TextField
                        error={!!phoneError}
                        placeholder="Mobile"
                        onChange={event => {
                          setPhone(event.nativeEvent.text.toLowerCase().trim())
                        }}
                      />
                      {!!phoneError && (
                        <TextDefault textColor={colors.errorColor} small>
                          {phoneError}
                        </TextDefault>
                      )}
                    </View>
                    <View style={alignment.MBsmall}>
                      <TextField
                        error={!!passwordError}
                        placeholder="Password"
                        password={true}
                        onChange={event => {
                          setPassword(
                            event.nativeEvent.text.toLowerCase().trim()
                          )
                        }}
                      />
                      {!!passwordError && (
                        <TextDefault textColor={colors.errorColor} small>
                          {passwordError}
                        </TextDefault>
                      )}
                    </View>
                  </View>
                  <View style={styles.mainBot}>
                    <View style={styles.botBtnContainer}>
                      <MainBtn
                        loading={loading}
                        onPress={async() => {
                          if (validateCredentials()|| true) {
                            const user = {
                              phone: phone.trim(),
                              email: email.toLowerCase().trim(),
                              password: password,
                              name: fullname,
                              picture: ''
                            }
                            mutateLogin(user)
                          }
                        }}
                        text="Sign up"
                      />
                    </View>
                    <View style={styles.mixedLine}>
                      <TextDefault textColor={colors.fontSecondColor}>
                        {'Already have an account: '}
                        <TextDefault
                          style={styles.ftTextUnderline}
                          textColor={colors.fontMainColor}
                          onPress={() => props.navigation.navigate('SignIn')}>
                          {'Sign in'}
                        </TextDefault>
                      </TextDefault>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp
