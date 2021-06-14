import React from 'react'
import { TouchableOpacity, View, ImageBackground } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { TextDefault } from '../../components'
import { colors, alignment } from '../../utils'

function SubCategoryCard(props) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.navigate('ProductListing', { id: props.data._id })
      }
      style={[styles.container, props.style]}>
      <View style={styles.cardImageContainer}>
        <ImageBackground
          source={
            props.data.image
              ? { uri: props.data.image }
              : require('../../assets/images/formBackground.png')
          }
          defaultSource={require('../../assets/images/formBackground.png')}
          resizeMode="cover"
          style={styles.imgResponsive}>
          <View style={styles.cardText}>
            <TextDefault
              numberOfLines={1}
              textColor={colors.white}
              H5
              style={alignment.PxSmall}
              center>
              {props.data?.title ?? '....'}
            </TextDefault>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(SubCategoryCard)
