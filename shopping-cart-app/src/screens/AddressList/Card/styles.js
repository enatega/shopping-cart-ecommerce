import { colors, scale, alignment } from '../../../utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.container,
    borderRadius: scale(5),
    overflow: 'hidden',
    alignItems: 'center',
    ...alignment.MBmedium,
    ...alignment.PTmedium,
    ...alignment.PBmedium
  },
  headerRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  address: {
    ...alignment.MTmedium,
    ...alignment.MBsmall,
    ...alignment.PLxSmall,
    width: '90%',
    justifyContent: 'center'
  },
  btnContainer: {
    width: '90%',
    justifyContent: 'flex-start'
  },
  selectedBtn: {
    height: scale(50),
    width: '100%',
    backgroundColor: colors.themeBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(4)
  },
  tickImage: {
    position: 'absolute',
    left: scale(20)
  },
  icon: {
    ...alignment.PxSmall
  }
})
export default styles
