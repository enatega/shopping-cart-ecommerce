import React, { useContext } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import ConfigurationContext from '../../../context/Configuration'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TextDefault } from '../../../components'
import { colors, scale, alignment } from '../../../utils'

function ShoppingCard(props) {
  const configuration = useContext(ConfigurationContext)
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: props.item.image }}
            style={styles.imgResponsive}
            resizeMode="cover"
          />
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.itemDetailContainer}>
            <TextDefault textColor={colors.fontMainColor} numberOfLines={1} H5>
              {props.item.product}
            </TextDefault>
            <TextDefault textColor={colors.fontBrown} numberOfLines={1} small>
              {props.item?.subCategory ?? ''}
            </TextDefault>
          </View>
          <View style={styles.quantityContainer}>
            <View
              style={{
                width: '60%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}>
              {props.item.selectedAttributes.map(data => {
                return (
                  <TextDefault
                    key={props.item.key + data.option.optionId}
                    textColor={colors.fontSecondColor}
                    small>
                    {data.title} : {data.option.title}
                  </TextDefault>
                )
              })}
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.quantitySelContainer}>
                <TouchableOpacity
                  activeOpacity={0}
                  onPress={props.removeQuantity}
                  style={styles.quantityIconStyle}>
                  <Ionicons
                    name="ios-arrow-back"
                    size={scale(20)}
                    color={colors.fontSecondColor}
                  />
                </TouchableOpacity>
                <TextDefault textColor={colors.fontSecondColor} H5>
                  {props.quantity}
                </TextDefault>
                <TouchableOpacity
                  activeOpacity={0}
                  onPress={props.addQuantity}
                  style={[styles.quantityIconStyle, { paddingRight: 0 }]}>
                  <Ionicons
                    name="ios-arrow-forward"
                    size={scale(20)}
                    color={colors.fontSecondColor}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.priceContainer}>
                <TextDefault
                  style={{ ...alignment.MLxSmall }}
                  textColor={colors.blueColor}
                  bold>
                  {configuration.currencySymbol} {props.price}
                </TextDefault>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
export default ShoppingCard
