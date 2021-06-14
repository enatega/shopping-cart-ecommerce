import React, { useState } from 'react'
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
  BackHeader,
  BottomTab,
  TextDefault,
  FlashMessage
} from '../../components'
import { colors, alignment } from '../../utils'
import { useNavigation, useRoute } from '@react-navigation/native'
import MainBtn from '../../ui/Buttons/MainBtn'
import { gql, useMutation } from '@apollo/client'
import { createAddress } from '../../apollo/server'

const CREATE_ADDRESS = gql`
  ${createAddress}
`

function NewAddress() {
  const navigation = useNavigation()
  const route = useRoute()
  const [title, titleSetter] = useState('')
  const [city, citySetter] = useState('')
  const [regionName, regionNameSetter] = useState('')
  const [additional, additionalSetter] = useState('')
  const [aptNumber, aptNumberSetter] = useState('')
  const [building, buildingSetter] = useState('')
  const [titleError, titleErrorSetter] = useState('')
  const [cityError, cityErrorSetter] = useState('')
  const [regionNameError, regionNameErrorSetter] = useState('')
  const [aptNumberError, aptNumberErrorSetter] = useState('')
  const [buildingError, buildingErrorSetter] = useState('')
  const [mutate, { loading }] = useMutation(CREATE_ADDRESS, {
    onCompleted,
    onError
  })
  const cartAddress = route.params?.backScreen ?? null

  function onCompleted(data) {
    FlashMessage({ message: 'Address added', type: 'success' })
    if (cartAddress === 'Cart') {
      navigation.navigate('Checkout')
    } else navigation.goBack()
  }

  function onError(error) {
    FlashMessage({
      message: `An error occured. Please try again. ${error}`,
      type: 'warning'
    })
  }

  function validate() {
    const titleError = !title.trim().length ? 'Error' : ''
    const cityError = !city.trim().length ? 'Error' : ''
    const regionError = !regionName.trim().length ? 'Error' : ''
    const aptNumberError = !aptNumber.trim().length ? 'Error' : ''
    const buildingError = !building.trim().length ? 'Error' : ''

    titleErrorSetter(titleError)
    cityErrorSetter(cityError)
    regionNameErrorSetter(regionError)
    aptNumberErrorSetter(aptNumberError)
    buildingErrorSetter(buildingError)
    return (
      !titleError.length &&
      !cityError.length &&
      !regionError.length &&
      !aptNumberError.length &&
      !buildingError.length
    )
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <BackHeader
          title="New Address"
          backPressed={() => navigation.goBack()}
        />
        <View style={styles.formMainContainer}>
          <View style={styles.nameAddressContainer}>
            <View style={styles.nameAddressLabel}>
              <TextDefault>{'Name of address'}</TextDefault>
            </View>
            <View style={styles.nameAddressInput}>
              <TextInput
                placeholder="My Home"
                placeholderTextColor={colors.fontPlaceholder}
                style={[
                  styles.addressInputStyle,
                  titleError.length > 0 ? styles.error : styles.titleBorder
                ]}
                onChangeText={text => titleSetter(text)}
                onBlur={() => {
                  titleErrorSetter(!title.trim().length ? 'Error' : '')
                }}
              />
            </View>
          </View>
          <ScrollView
            style={styles.flex}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              flexGrow: 1,
              ...alignment.PBlarge
            }}>
            <View style={styles.formContainer}>
              <View style={styles.formContentContainer}>
                <View style={styles.twoItemsContainer}>
                  <View style={styles.halfContainer}>
                    <View style={styles.labelContainer}>
                      <TextDefault textColor={colors.fontSecondColor} H5>
                        {'Region'}
                      </TextDefault>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        value={regionName}
                        style={[
                          styles.flex,
                          styles.inputText,
                          regionNameError.length > 0 && styles.error
                        ]}
                        placeholder="Fedral"
                        placeholderTextColor={colors.fontPlaceholder}
                        onChangeText={text => regionNameSetter(text)}
                        onBlur={() => {
                          regionNameErrorSetter(
                            !regionName.trim().length ? 'Error' : ''
                          )
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.halfContainer}>
                    <View style={styles.labelContainer}>
                      <TextDefault textColor={colors.fontSecondColor} H5>
                        {'City'}
                      </TextDefault>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        value={city}
                        style={[
                          styles.flex,
                          styles.inputText,
                          cityError.length > 0 && styles.error
                        ]}
                        placeholder="Islamabad"
                        placeholderTextColor={colors.fontPlaceholder}
                        onChangeText={text => citySetter(text)}
                        onBlur={() => {
                          cityErrorSetter(!city.trim().length ? 'Error' : '')
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.twoItemsContainer}>
                  <View style={styles.halfContainer}>
                    <View style={styles.labelContainer}>
                      <TextDefault textColor={colors.fontSecondColor} H5>
                        {'Apt/Villa Number'}
                      </TextDefault>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[
                          styles.flex,
                          styles.inputText,
                          aptNumberError.length > 0 && styles.error
                        ]}
                        placeholder="01"
                        placeholderTextColor={colors.fontPlaceholder}
                        onChangeText={text => aptNumberSetter(text)}
                        onBlur={() => {
                          aptNumberErrorSetter(
                            !aptNumber.trim().length ? 'Error' : ''
                          )
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.halfContainer}>
                    <View style={styles.labelContainer}>
                      <TextDefault textColor={colors.fontSecondColor} H5>
                        {'Building/Villa Name'}
                      </TextDefault>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[
                          styles.flex,
                          styles.inputText,
                          buildingError.length > 0 && styles.error
                        ]}
                        placeholder="Block 4"
                        placeholderTextColor={colors.fontPlaceholder}
                        onChangeText={text => buildingSetter(text)}
                        onBlur={() => {
                          buildingErrorSetter(
                            !building.trim().length ? 'Error' : ''
                          )
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.oneItemContainer}>
                  <View style={styles.fullContainer}>
                    <View style={styles.labelContainer}>
                      <TextDefault textColor={colors.fontSecondColor} H5>
                        {'Additional Details'}
                      </TextDefault>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        value={additional}
                        style={[styles.flex, styles.inputText]}
                        placeholder="N/A"
                        placeholderTextColor={colors.fontPlaceholder}
                        onChangeText={text => additionalSetter(text)}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <MainBtn
                loading={loading}
                text="Add new address"
                style={{ width: '90%' }}
                onPress={() => {
                  if (validate()) {
                    mutate({
                      variables: {
                        addressInput: {
                          label: title.trim(),
                          region: regionName.trim(),
                          city: city.trim(),
                          apartment: aptNumber.trim(),
                          building: building.trim(),
                          details: additional.trim()
                        }
                      }
                    })
                  }
                }}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <BottomTab screen="PROFILE" />
    </SafeAreaView>
  )
}

export default NewAddress
