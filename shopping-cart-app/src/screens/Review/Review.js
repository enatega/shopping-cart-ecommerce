import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import StarRating from 'react-native-star-rating'
import TextDefault from '../../components/Text/TextDefault/TextDefault'
import { EvilIcons } from '@expo/vector-icons'
import { scale } from '../../utils/scaling'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../../utils'
import { BackHeader, FlashMessage } from '../../components'
import { useMutation, gql } from '@apollo/client'
import { reviewOrder } from '../../apollo/server'
import MainBtn from '../../ui/Buttons/MainBtn'

const REVIEWORDER = gql`
  ${reviewOrder}
`

function Review() {
  const navigation = useNavigation()
  const route = useRoute()
  const product = route.params.product ?? null
  const order = route.params.order ?? null
  const [rating, setRating] = useState(1)
  const [description, setDescription] = useState('')

  const [mutate, { loading: loadingMutation }] = useMutation(REVIEWORDER, {
    onError,
    onCompleted
  })

  function onFinishRating(rating) {
    setRating(rating)
  }

  function onChangeText(description) {
    setDescription(description)
  }
  function validate() {
    if (rating < 1) {
      FlashMessage({ message: 'Star rating is missing!', type: 'warning' })
      return false
    }
    if (!description.length) {
      FlashMessage({ message: 'Review is missing!', type: 'warning' })
      return false
    }
    return true
  }

  function onSubmit() {
    mutate({
      variables: {
        order: order,
        product: product,
        rating: rating,
        description: description
      }
    })
  }

  function onCompleted(data) {
    navigation.goBack()
  }

  function onError(error) {
    console.log('error', error)
    // FlashMessage({
    //   message: error.networkError.result.errors[0].message
    // })
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaView]}>
      <View style={[styles.flex, styles.mainBackground]}>
        <BackHeader title="Review" backPressed={() => navigation.goBack()} />

        <View style={styles.reviewTextContainer}>
          <View style={styles.reviewTextSubContainer}>
            <View style={styles.reviewTextContainerText}>
              <TextDefault textColor={colors.fontMainColor} H4 bold>
                {'Write Review'}
              </TextDefault>
            </View>
            <View style={styles.reviewTextContainerImage}>
              <EvilIcons
                name="pencil"
                size={scale(35)}
                color={colors.fontBrown}
              />
            </View>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingSubContainer}>
            <StarRating
              emptyStarColor={colors.startColor}
              fullStarColor={colors.startOutlineColor}
              disabled={false}
              maxStars={5}
              rating={rating}
              selectedStar={onFinishRating}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <TextInput
              style={[styles.textinput, { color: colors.fontSecondColor }]}
              placeholderTextColor={colors.fontThirdColor}
              onChangeText={onChangeText}
              placeholder={'Write a review'}
            />
          </View>
        </View>
        <View style={styles.btnSubContainer}>
          <MainBtn
            loading={loadingMutation}
            onPress={() => {
              if (validate()) onSubmit()
            }}
            text="Submit"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
export default Review
