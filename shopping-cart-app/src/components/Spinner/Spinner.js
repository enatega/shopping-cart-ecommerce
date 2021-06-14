import React from 'react'
import { ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { colors } from '../../utils'

function Spinner(props) {
  return (
    <ActivityIndicator
      animating={props.loading ?? true}
      style={{
        flex: 1,
        backgroundColor: props.backColor
          ? props.backColor
          : colors.themeBackground
      }}
      size={props.size || 'large'}
      color={props.spinnerColor ? props.spinnerColor : colors.spinnerColor}
    />
  )
}
Spinner.propTypes = {
  backColor: PropTypes.string,
  spinnerColor: PropTypes.string,
  size: PropTypes.string
}
export default Spinner
