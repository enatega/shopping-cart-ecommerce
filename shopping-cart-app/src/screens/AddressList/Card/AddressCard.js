import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { colors, scale } from '../../../utils'
import { TextDefault } from '../../../components/Text'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import MainBtn from '../../../ui/Buttons/MainBtn'
import { useMutation, gql } from '@apollo/client'
import { deleteAddress, selectAddress } from '../../../apollo/server'

const DELETE_ADDRESS = gql`
  ${deleteAddress}
`
const SELECT_ADDRESS = gql`
  ${selectAddress}
`

function Card(props) {
  console.log('card',props)
  const navigation = useNavigation()
  const isDefault = props.default
  const [mutate, { loading: loadingMutation }] = useMutation(DELETE_ADDRESS)
  const [
    mutateSelected,
    { loading: loadingSelected }
  ] = useMutation(SELECT_ADDRESS, { onError })

  function onError(error) {
    console.log(error)
  }
  const onSelectAddress = address => {
    mutateSelected({ variables: { id: address._id } })
  }

  function renderSelectedButton() {
    return (
      <TouchableOpacity activeOpacity={0} style={styles.selectedBtn}>
        <View style={styles.tickImage}>
          <Feather name="check" size={scale(25)} color={colors.selected} />
        </View>
        <TextDefault textColor={colors.fontMainColor} H5>
          {'My Default Address'}
        </TextDefault>
      </TouchableOpacity>
    )
  }

  function renderUnselectedButton() {
    return (
      <MainBtn
        loading={loadingSelected}
        onPress={() => {
          onSelectAddress(props.item)
        }}
        text="Mark it as Default Address"
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TextDefault textColor={colors.fontBrown} H4>
          {' '}
          {props.item.label}
        </TextDefault>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.icon}
            activeOpacity={0}
            onPress={() =>
              navigation.navigate('EditAddress', { ...props.item })
            }>
            <Feather
              name="edit"
              size={scale(18)}
              color={colors.fontThirdColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loadingMutation}
            style={styles.icon}
            onPress={() => {
              mutate({ variables: { id: props.item._id } })
            }}>
            {!loadingMutation ? (
              <Feather
                name="trash-2"
                size={scale(18)}
                color={colors.fontThirdColor}
              />
            ) : (
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={scale(18)}
                color={colors.fontThirdColor}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.address}>
        <TextDefault textColor={colors.fontMainColor}>
          {props.item.region}
        </TextDefault>
        <TextDefault textColor={colors.fontMainColor}>
          {props.item.city}
        </TextDefault>
        <TextDefault textColor={colors.fontMainColor}>
          {props.item.apartment}
          {', '}
          {props.item.building}
        </TextDefault>

        <TextDefault textColor={colors.fontMainColor}>
          Details: {props.item.details ?? 'None'}
        </TextDefault>
      </View>
      <View style={styles.btnContainer}>
        {isDefault ? renderSelectedButton() : renderUnselectedButton()}
      </View>
    </View>
  )
}

export default Card
