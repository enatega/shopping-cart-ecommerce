import React from 'react'
import { View, FlatList, Image } from 'react-native'
import styles from './styles'
import ProductCard from '../../ui/ProductCard/ProductCard'
import MainBtn from '../../ui/Buttons/MainBtn'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { gql, useQuery } from '@apollo/client'
import { categoryProduct } from '../../apollo/server'
import {
  Spinner,
  TextError,
  TextDefault,
  BackHeader,
  BottomTab
} from '../../components'
import { colors } from '../../utils'

const GET_PRODUCT = gql`
  ${categoryProduct}
`

function ProductListing(props) {
  const route = useRoute()
  const navigation = useNavigation()
  const id = route.params?.id ?? null
  const {
    data: categoryData,
    loading,
    error,
    refetch,
    networkStatus
  } = useQuery(GET_PRODUCT, { variables: { id: id } })

  if (id === null) {
    navigation.goBack()
    return null
  }
  function emptyView() {
    return (
      <View style={styles.subContainerImage}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/noProducts.png')}></Image>
        </View>
        <View style={styles.descriptionEmpty}>
          <TextDefault textColor={colors.fontSecondColor} bold center>
            {'There is no product.'}
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
      <View style={[styles.flex, styles.container]}>
        <BackHeader
          title={
            categoryData?.productByCategory[0]?.subCategory?.title ?? 'Products'
          }
          backPressed={() => props.navigation.goBack()}
        />
        {error ? (
          <TextError text={error.message} />
        ) : loading ? (
          <Spinner />
        ) : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.categoryContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={emptyView()}
            refreshing={networkStatus === 4}
            onRefresh={() => refetch()}
            numColumns={2}
            data={categoryData ? categoryData.productByCategory : []}
            renderItem={({ item }) => (
              <ProductCard styles={styles.productCard} {...item} />
            )}
          />
        )}
        <BottomTab screen="HOME" />
      </View>
    </SafeAreaView>
  )
}

export default ProductListing
