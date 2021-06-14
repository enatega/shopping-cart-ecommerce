import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'
import { colors, scale } from '../../utils'
import { Ionicons } from '@expo/vector-icons'

function SearchBar(props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textfield}
        placeholder={props.placeholderText}
        placeholderTextColor={colors.primaryBlackColor}
        onChange={props.onChange}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0}
        onPress={props.onPress}>
        <Ionicons
          name="ios-search"
          size={scale(25)}
          color={colors.buttonBackground}
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar
