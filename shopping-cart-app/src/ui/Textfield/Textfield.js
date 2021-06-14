import React from 'react'
import { View, TextInput } from 'react-native'
import { colors } from '../../utils'
import styles from './styles'

/* Config/Constants
============================================================================= */

/* =============================================================================
<TextField />
A TextInput covered by a white background View, greyish border, black text. has 100% width and mod scale 38 height.
--------------------------------------------------------------------------------

Props:
  ?
  onChange Event  : send the function to be called for onChange event
  placeHolderText : send the Text for placeholder
  placeHolderColor: sent the Color for placeholder
  containerStyle  : allows user to override the container style
  password        : hide the text for user as writing password.
============================================================================= */

const TextField = props => {
  const placeholderColor = props.placeholderColor
    ? props.placeholderColor
    : colors.fontPlaceholder
  const password = props.password ? props.password : false
  return (
    <View
      style={[
        styles.input_view,
        props.containerStyle,
        props.error
          ? { borderColor: colors.errorColor }
          : { borderColor: colors.backgroudGray }
      ]}>
      <TextInput
        onChange={props.onChange}
        style={styles.input}
        value={props.value}
        placeholderTextColor={placeholderColor}
        placeholder={props.placeholder}
        secureTextEntry={password}
      />
    </View>
  )
}
/* Export
============================================================================= */
export default TextField
