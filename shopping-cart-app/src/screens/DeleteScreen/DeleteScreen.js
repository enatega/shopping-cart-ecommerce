import React, { useContext } from 'react'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useMutation, gql } from '@apollo/client'
import UserContext from '../../context/User'
import { updateUser } from '../../apollo/server'
const UPDATEUSER = gql`
  ${updateUser}
`
import { TextDefault, BackHeader, BottomTab } from '../../components'
import { alignment } from '../../utils'
import { View, TouchableOpacity } from 'react-native'
function DeleteButton(props) {
  const navigation = useNavigation()
  const { logout, profile } = useContext(UserContext)
  const [updateUserInfo] = useMutation(UPDATEUSER)
  async function updateUserInformation() {
    updateUserInfo({
      variables: {
        name: profile.name,
        phone: profile.phone,
        is_Active: false
      }
    })
  }
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <BackHeader
        title={'Delete Account'}
        backPressed={() => navigation.goBack()}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextDefault
          bolder
          H5
          style={{
            padding: 25,
            textAlign: 'center',
            fontWeight: '900'
          }}>
          Are you Sure you want to Delete Your Account?
        </TextDefault>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            borderRadius: 10,
            width: '70%',
            padding: 15,
            ...alignment.MTlarge
          }}
          onPress={async () => {
            await updateUserInformation()
            logout()
            navigation.navigate('MainLanding')
          }}>
          <TextDefault center bold style={{ color: 'white' }}>
            Delete Account
          </TextDefault>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ width: '100%', paddingTop: 30, paddingBottom: 20 }}
          onPress={() => navigation.goBack()}>
          <TextDefault center>Cancel</TextDefault>
        </TouchableOpacity>
      </View>
      <BottomTab screen="PROFILE" />
    </SafeAreaView>
  )
}
export default DeleteButton
