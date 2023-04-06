import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  BottomTab,
  TextDefault,
  BackHeader,
  FlashMessage
} from '../../components'
import { SimpleLineIcons } from '@expo/vector-icons'
import { scale, colors } from '../../utils'
import { useNavigation, useRoute } from '@react-navigation/native'
import UserContext from '../../context/User'
import MainBtn from '../../ui/Buttons/MainBtn'
import { updateUser } from '../../apollo/server'
import { gql, useMutation } from '@apollo/client'

const UPDATEUSER = gql`
  ${updateUser}
`

function EditingProfile(props) {
  const route = useRoute()
  const { profile } = useContext(UserContext)
  const email = profile?.email ?? ''
  const [name, nameSetter] = useState(profile?.name ?? '')
  const [phone, phoneSetter] = useState(profile?.phone ?? '')
  const backScreen = route.params ? route.params.backScreen : null
  const [nameError, nameErrorSetter] = useState(null)
  const [phoneError, phoneErrorSetter] = useState(null)
  const navigation = useNavigation()
  const [mutate, { loading: loadingMutation }] = useMutation(UPDATEUSER, {
    onCompleted,
    onError
  })

  useEffect(() => {
    if (backScreen) {
      phoneErrorSetter('Phone number is required')
      FlashMessage({ message: 'Phone Number is missing' })
    }
  }, [backScreen])

  function onCompleted({ updateUser }) {
    if (updateUser) {
      FlashMessage({ message: "User's Info Updated", type: 'success' })
    }
    if (backScreen) {
      navigation.goBack()
    }
  }
  function onError(error) {
    try {
      FlashMessage({ message: error.message, type: 'warning' })
    } catch (err) {}
  }

  function phoneValiation() {
    let result = true
    phoneErrorSetter(null)
    const num = phone.trim().replace('.', '')
    if (num.length < 11 || num.length > 15 || isNaN(num)) {
      phoneErrorSetter('Minimum 11 and maximum 15 characters allowed')
      result = false
    }
    return result
  }
  function nameValidation() {
    let result = true
    nameErrorSetter(null)
    const nameRegex = /([a-zA-Z]{3,30}\s*)+/
    if (!nameRegex.test(name)) {
      nameErrorSetter('Full name is required')
      result = false
    }
    return result
  }

  function validate() {
    const phoneResult = phoneValiation()
    const nameResult = nameValidation()
    return phoneResult && nameResult
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <BackHeader
          title="Editing Profile"
          backPressed={() => navigation.goBack()}
        />
        <ScrollView
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.formMainContainer]}>
            <View style={styles.formContainer}>
              <View style={styles.profileImageContainer}>
                <SimpleLineIcons
                  name="user"
                  size={scale(40)}
                  color={colors.fontBrown}
                />
              </View>
              <View style={styles.formContentContainer}>
                <View style={styles.oneItemContainer}>
                  <View style={styles.fullContainer}>
                    <View style={styles.labelContainer}>
                      <TextDefault textColor={colors.fontThirdColor} H5>
                        {'Full Name'}
                      </TextDefault>
                    </View>
                    <View
                      style={[
                        styles.inputContainer,
                        !!nameError && styles.error
                      ]}>
                      <TextInput
                        value={name}
                        style={[styles.flex, styles.inputText]}
                        placeholder="e.g Saad"
                        placeholderTextColor={colors.fontPlaceholder}
                        onChangeText={text => nameSetter(text)}
                        onBlur={nameValidation}
                      />
                    </View>
                    {!!nameError && (
                      <TextDefault textColor={colors.errorColor} small>
                        {nameError}{' '}
                      </TextDefault>
                    )}
                  </View>
                </View>
                <View style={styles.oneItemContainer}>
                  <View style={styles.fullContainer}>
                    <View style={styles.labelContainer}>
                      <TextDefault textColor={colors.fontThirdColor} H5>
                        {'Email'}
                      </TextDefault>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[styles.flex, styles.disableInput]}
                        defaultValue={email}
                        editable={false}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.oneItemContainer}>
                  <View style={styles.fullContainer}>
                    <View style={styles.labelContainer}>
                      <TextDefault textColor={colors.fontThirdColor} H5>
                        {'Phone Number'}
                      </TextDefault>
                    </View>
                    <View
                      style={[
                        styles.inputContainer,
                        !!phoneError && styles.error
                      ]}>
                      <TextInput
                        style={[styles.flex, styles.inputText]}
                        value={phone}
                        keyboardType={'phone-pad'}
                        placeholder="+92 3339461270"
                        placeholderTextColor={colors.fontPlaceholder}
                        onChangeText={text => phoneSetter(text)}
                        onBlur={phoneValiation}
                      />
                    </View>
                    {!!phoneError && (
                      <TextDefault textColor={colors.errorColor} small>
                        {phoneError}{' '}
                      </TextDefault>
                    )}
                  </View>
                </View>
              </View>

              <View style={styles.addContainer}>
                <MainBtn
                  loading={loadingMutation}
                  style={{ width: '80%' }}
                  onPress={async () => {
                    if (validate()) {
                      mutate({
                        variables: {
                          name: name,
                          phone: phone,
                          is_Active: true
                        }
                      })
                    }
                  }}
                  text="Save"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomTab screen="PROFILE" />
    </SafeAreaView>
  )
}

export default EditingProfile
