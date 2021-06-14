import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import styles from './styles'
import TextField from '../../../ui/Textfield/Textfield'
import { TextDefault, Spinner, FlashMessage } from '../../../components'
import { forgotPassword } from '../../../apollo/server'
import { gql, useMutation } from '@apollo/client'
import { colors } from '../../../utils'

const FORGOT_PASSWORD = gql`
  ${forgotPassword}
`

function ForgotPassword(props) {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [mutate, { loading }] = useMutation(FORGOT_PASSWORD, {
    onCompleted,
    onError
  })

  function validateCredentials() {
    let result = true
    setEmailError(null)
    if (!email) {
      setEmailError('Email is required')
      result = false
    } else {
      const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
      if (emailRegex.test(email) !== true) {
        setEmailError('Invalid Email')
        result = false
      }
    }
    return result
  }
  function onCompleted(data) {
    FlashMessage({
      message: 'Reset password link sent on your email'
    })
    props.hideModal()
  }
  function onError(error) {
    if (error.networkError) {
      FlashMessage({
        message: error.networkError.result.errors[0].message
      })
    } else if (error.graphQLErrors) {
      FlashMessage({
        message: error.graphQLErrors[0].message
      })
    }
  }

  function renderContinueAction() {
    return (
      <TouchableOpacity
        disabled={loading}
        activeOpacity={1}
        style={[styles.btnContainer, styles.brownColor]}
        onPress={event => {
          if (validateCredentials()) {
            mutate({ variables: { email: email.toLowerCase().trim() } })
          }
        }}>
        {loading ? (
          <Spinner backColor="transparent" spinnerColor={colors.white} />
        ) : (
          <TextDefault style={styles.sendStyle}>CONTINUE</TextDefault>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <Modal
      isVisible={props.modalVisible}
      onBackdropPress={props.hideModal}
      onBackButtonPress={props.hideModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>Forgot password</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.subtitleStyle}>
              No worries, let us help you out!
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextField
              error={emailError}
              placeholder="Your Email"
              style={{ textAlign: 'center', backgroundColor: '#F7F7F7' }}
              placeholderTextColor="black"
              onChange={e => setEmail(e.nativeEvent.text.trim())}
            />
          </View>
          {renderContinueAction()}
        </View>
      </View>
    </Modal>
  )
}

export default ForgotPassword
