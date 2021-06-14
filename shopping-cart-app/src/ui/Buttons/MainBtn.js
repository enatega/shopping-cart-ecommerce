import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { mainBtnStyles as styles } from './styles'
import { Spinner, TextDefault } from '../../components'
import { colors } from '../../utils'

/* Config/Constants
============================================================================= */

/* =============================================================================
<MainBtn />
Golden/ Brownish btn used. Height is fixed, width is adaptable. If have to force width, set width of the parent container.
--------------------------------------------------------------------------------

Props:
  ?
  onPress Event: send the function to be called for onPress event
  text: send the Text for button
============================================================================= */

const MainBtn = props => (
  <View style={[styles.backgroundColor, props.style]}>
    {props.loading ? (
      <Spinner backColor="rgba(0,0,0,0.1)" spinnerColor={colors.white} />
    ) : (
      <TouchableOpacity
        onPress={props.onPress}
        style={styles.main_brown_btn}
        activeOpacity={0}>
        <TextDefault textColor={colors.buttonText} H5 center>
          {props.text}
        </TextDefault>
      </TouchableOpacity>
    )}
  </View>
)

export default MainBtn
