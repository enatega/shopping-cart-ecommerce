import React, { useState, useContext, useEffect } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import { gql, useMutation } from '@apollo/client'
import { addToWhishlist } from '../../apollo/server'
import { TextDefault } from '../../components'
import { colors, scale } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import UserContext from '../../context/User'

const ADD_TO_WHISHLIST = gql`
  ${addToWhishlist}
`

function ProductCard(props) {
  const navigation = useNavigation()
  const { isLoggedIn, profile } = useContext(UserContext)
  const [liked, setLiked] = useState(false)
  const [mutate, { loading: loadingMutation }] = useMutation(ADD_TO_WHISHLIST)
  useEffect(() => {
    if (isLoggedIn) {
      setLiked(
        profile.whishlist
          ? !!profile.whishlist.find(whishlist => whishlist._id === props._id)
          : false
      )
    } else {
      setLiked(false)
    }
  }, [profile, isLoggedIn])
  return (
    <TouchableOpacity
      disabled={loadingMutation}
      activeOpacity={1}
      onPress={() =>
        navigation.navigate('ProductDescription', { product: props })
      }
      style={[styles.cardContainer, props.styles]}>
      <View style={styles.topCardContainer}>
        <Image
          source={{ uri: props.image[0] }}
          defaultSource={require('../../assets/images/formBackground.png')}
          resizeMode="cover"
          style={styles.imgResponsive}
        />
      </View>
      <View style={styles.botCardContainer}>
        <View style={styles.botSubCardContainer}>
          <View>
            <TextDefault numberOfLines={1} textColor={colors.fontMainColor}>
              {props.title}
            </TextDefault>
            <View style={styles.priceContainer}>
              <TextDefault
                style={{ maxWidth: '70%' }}
                numberOfLines={1}
                textColor={colors.fontSecondColor}
                small>
                {props.subCategory.title}
              </TextDefault>
              <View style={styles.ratingContainer}>
                <View style={{ alignSelf: 'center', height: '80%' }}>
                  <Ionicons name="md-star" size={scale(11)} color="#4165b9" />
                </View>
                <TextDefault
                  textColor={colors.fontSecondColor}
                  style={{ marginLeft: 2 }}>
                  {props.reviewData.ratings}
                </TextDefault>
                <TextDefault
                  textColor={colors.fontSecondColor}
                  style={{ marginLeft: 2 }}
                  small>
                  {`( ${props.reviewData.total} )`}
                </TextDefault>
              </View>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <TextDefault
              style={{ maxWidth: '75%' }}
              numberOfLines={1}
              textColor={colors.fontBlue}>
              ${props.price.toFixed(2)}
            </TextDefault>
            <View style={[styles.aboutRestaurant]}>
              <TouchableOpacity
                disabled={loadingMutation}
                activeOpacity={0}
                onPress={() => {
                  if (isLoggedIn) {
                    mutate({
                      variables: {
                        productId: props._id
                      }
                    })
                    setLiked(prev => !prev)
                  } else {
                    navigation.navigate('SignIn')
                  }
                }}
                style={styles.likeContainer}>
                <Ionicons
                  name={liked ? 'ios-heart-sharp' : 'ios-heart-outline'}
                  size={scale(18)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard
