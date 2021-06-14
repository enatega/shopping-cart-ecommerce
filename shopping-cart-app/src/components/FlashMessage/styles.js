import { textStyles, alignment } from '../../utils'
import { StyleSheet, Dimensions } from 'react-native'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  text: {
    ...textStyles.H5,
    ...alignment.PTxSmall
  },
  position: {
    marginTop: height * 0.08
  }
})
export default styles
