import React from 'react'
import { View, FlatList, ImageBackground } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'
import styles from './styles'
import CategoryCard from '../../ui/CategoryCard/CategoryCard'
import { BottomTab, TextDefault, TextError, Spinner } from '../../components'
import { verticalScale, scale, colors } from '../../utils'
import ProductCard from '../../ui/ProductCard/ProductCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeaderBackButton } from '@react-navigation/stack'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { gql, useQuery } from '@apollo/client'
import { categories, produccts } from '../../apollo/server'

const caroselImage = [
  require('../../assets/images/MainLanding/banner-1.png'),
  require('../../assets/images/MainLanding/recommended_2.png'),
  require('../../assets/images/MainLanding/carosel_img_3.png'),
  require('../../assets/images/MainLanding/banner-1.png'),
  require('../../assets/images/MainLanding/recommended_2.png'),
  require('../../assets/images/MainLanding/carosel_img_3.png')
]

const CATEGORIES = gql`
  ${categories}
`
const PRODUCTS_DATA = gql`
  ${produccts}
`

function MainLanding(props) {
  const navigation = useNavigation()
  const { data: categoryData } = useQuery(CATEGORIES)
  const {
    data: productsData,
    loading,
    error,
    refetch,
    networkStatus
  } = useQuery(PRODUCTS_DATA)
  const Featured = productsData?.products
    ? productsData.products.filter(item => item.featured)
    : []

  function renderCarosel() {
    return (
      <View style={styles.caroselContainer}>
        <SwiperFlatList
          data={caroselImage}
          index={0}
          showPagination
          autoplay
          autoplayDelay={3}
          autoplayLoop={true}
          paginationActiveColor="#fff"
          paginationStyle={{ marginBottom: '7%' }}
          paginationStyleItem={{
            height: verticalScale(8),
            width: verticalScale(8),
            marginLeft: 0
          }}
          renderItem={({ item }) => (
            <ImageBackground source={item} style={styles.caroselStyle} />
          )}
        />
        <View style={styles.menuDrawerContainer}>
          <HeaderBackButton
            labelVisible={false}
            backImage={() => (
              <MaterialIcons
                name="menu"
                size={scale(30)}
                style={styles.leftIconPadding}
                color={colors.fontSecondColor}
              />
            )}
            onPress={() => navigation.toggleDrawer()}
          />
        </View>
      </View>
    )
  }

  function renderHeader() {
    return (
      <>
        {renderCarosel()}
        <View style={styles.categoryContainer}>
          {categoryData &&
            categoryData.categories.map((category, index) => {
              return (
                <CategoryCard
                  style={styles.spacer}
                  key={index}
                  cardLabel={category.title}
                  id={category._id}
                  title={category.title}
                />
              )
            })}
        </View>
        {Featured.length > 0 && (
          <View style={styles.titleSpacer}>
            <TextDefault textColor={colors.fontMainColor} H4>
              {'Featured'}
            </TextDefault>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item._id}
              data={Featured}
              renderItem={({ item, index }) => {
                return (
                  <ProductCard styles={styles.itemCardContainer} {...item} />
                )
              }}
            />
          </View>
        )}
        <View style={styles.titleSpacer}>
          <TextDefault textColor={colors.fontMainColor} H4>
            {'All Items'}
          </TextDefault>
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.grayBackground, styles.flex]}>
        {error ? (
          <TextError text={error.message} />
        ) : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            refreshing={networkStatus === 4}
            onRefresh={() => refetch()}
            ListFooterComponent={loading && <Spinner />}
            ListHeaderComponent={renderHeader}
            data={productsData ? productsData.products : []}
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
export default MainLanding
