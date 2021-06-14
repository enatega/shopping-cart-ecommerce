import React, { useContext, useState } from 'react'
import { View, FlatList, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { colors, scale } from '../../utils'
import MainBtn from '../../ui/Buttons/MainBtn'
import { Feather, FontAwesome } from '@expo/vector-icons'
import {
  TextError,
  TextDefault,
  BackHeader,
  BottomTab,
  Spinner
} from '../../components'
import { useMutation, gql } from '@apollo/client'
import { addToWhishlist } from '../../apollo/server'
import UserContext from '../../context/User'

const REMOVE_FROM_WHISHLIST = gql`
  ${addToWhishlist}
`

function Favourite(props) {
  const navigation = useNavigation()
  const [indexDelete, indexSetterDelete] = useState(-1)
  const { profile, loadingProfile, errorProfile } = useContext(UserContext)
  const [mutate, { loading: loadingMutation }] = useMutation(
    REMOVE_FROM_WHISHLIST
  )
  function emptyView() {
    return (
      <View style={styles.subContainerImage}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/wishlist.png')}></Image>
        </View>
        <View style={styles.descriptionEmpty}>
          <TextDefault textColor={colors.fontSecondColor} bold center>
            {'Your favourite product is missing.'}
          </TextDefault>
        </View>
        <View style={styles.emptyButton}>
          <MainBtn
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('MainLanding')}
            text="Browse Product"
          />
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.grayBackground, styles.flex]}>
        <BackHeader
          title={'Favourite'}
          backPressed={() => navigation.goBack()}
        />
        {loadingProfile ? (
          <Spinner />
        ) : errorProfile ? (
          <TextError text={'User Context: ' + errorProfile.message} />
        ) : (
          <FlatList
            data={profile ? profile.whishlist : []}
            style={styles.flex}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={emptyView}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                disabled={loadingMutation}
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('ProductDescription', { product: item })
                }
                style={styles.cardContainer}>
                <View style={styles.leftContainer}>
                  <Image
                    source={{
                      uri:
                        item.image.length > 0
                          ? item.image[0]
                          : 'https://res.cloudinary.com/ecommero/image/upload/v1597658445/products/su6dg1ufmtfuvrjbhgtj.png'
                    }}
                    resizeMode="cover"
                    style={[styles.imgResponsive, styles.roundedBorder]}
                  />
                </View>
                <View style={styles.rightContainer}>
                  <View style={styles.subRightContainer}>
                    <View style={styles.titleContainer}>
                      <TextDefault
                        style={{ maxWidth: '90%' }}
                        textColor={colors.fontMainColor}
                        numberOfLines={1}>
                        {item.title}
                      </TextDefault>
                      <View style={styles.rightArrowContainer}>
                        <Feather
                          name="chevron-right"
                          size={scale(20)}
                          color={colors.fontSecondColor}
                        />
                      </View>
                    </View>
                    <View style={styles.subTitleContainer}>
                      <TextDefault
                        textColor={colors.fontThirdColor}
                        numberOfLines={1}
                        small>
                        {item.subCategory.title}
                      </TextDefault>
                    </View>
                    <View style={styles.actionsContainer}>
                      <View style={styles.subActionsContainer}>
                        <TextDefault
                          style={{ maxWidth: '75%' }}
                          numberOfLines={1}
                          textColor={colors.fontBlue}>
                          ${item.price.toFixed(2)}
                        </TextDefault>
                        <TouchableOpacity
                          disabled={loadingMutation}
                          activeOpacity={1}
                          onPressIn={() => indexSetterDelete(index)}
                          onPress={() => {
                            mutate({
                              variables: {
                                productId: item._id
                              }
                            })
                          }}
                          style={styles.actionContainer}>
                          {loadingMutation && index === indexDelete ? (
                            <Spinner
                              backColor="transparent"
                              size="small"
                              spinnerColor={colors.google}
                            />
                          ) : (
                            <FontAwesome
                              name="trash-o"
                              size={scale(20)}
                              color={colors.google}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        <BottomTab screen="PROFILE" />
      </View>
    </SafeAreaView>
  )
}
export default Favourite
