import { StyleSheet } from 'react-native'
import { alignment, colors, verticalScale, scale } from '../../utils'

export default {
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  mainContainer: {
    backgroundColor: colors.themeBackground
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.medHorizontalLine,
    ...alignment.MTxSmall,
    ...alignment.MBxSmall
  },
  backImg: {
    marginBottom: '3%',
    marginLeft: '5%'
  },
  cardContainer: {
    backgroundColor: colors.backgroudGray,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.MBlarge
  },
  card: {
    backgroundColor: colors.whiteColor,
    width: '95%',
    borderRadius: scale(8),
    ...alignment.Psmall
  },
  cardLeftContainer: {
    width: '35%',
    height: '100%',
    borderTopLeftRadius: verticalScale(8),
    borderBottomLeftRadius: verticalScale(8)
  },
  cardRightContainer: {
    width: '60%',
    height: '100%',
    ...alignment.MLxSmall
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: verticalScale(8),
    borderBottomLeftRadius: verticalScale(8)
  },
  timelineContainer: {
    backgroundColor: colors.backgroudGray,
    flex: 1,
    ...alignment.PTlarge,
    ...alignment.PLsmall,
    ...alignment.PRsmall
  }
}
