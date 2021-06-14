import { colors, scale } from '../../../utils'

export default {
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
    padding: scale(5),
    paddingLeft: scale(10),
    paddingRight: scale(10),
    margin: scale(5),
    marginLeft: 0,
    marginRight: scale(10),
    borderWidth: 1,
    borderColor: colors.blackText,
    borderRadius: scale(3)
  }
}
