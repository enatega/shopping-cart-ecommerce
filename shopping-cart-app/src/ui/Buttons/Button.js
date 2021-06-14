import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { styles } from './styles'
import { Spinner } from '../../components'
import { colors } from '../../utils'

function Button(props) {
  return (
    <TouchableOpacity
      activeOpacity={0}
      onPress={props.onPress}
      style={[styles.container, props.containerStyle]}>
      {props.loading ? (
        <Spinner backColor="transparent" spinnerColor={colors.white} />
      ) : (
        <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
      )}
    </TouchableOpacity>
  )
}

export default Button
