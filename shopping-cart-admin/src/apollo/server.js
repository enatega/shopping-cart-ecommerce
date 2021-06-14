export const categories = `query categories
    {
      categories{
          _id
          title
    }}`

export const subscribePlaceOrder = `subscription SubscribePaceOrder{
  subscribePlaceOrder{
      order{
        _id
    orderId
    paymentMethod
    paymentStatus
    status
    orderStatus
    orderAmount
    reason
    deliveryCharges
    createdAt
    deliveryAddress{
      label
      region
      city
      apartment
      building
      details
    }
    items{
      _id
      productId
      product
      price
      quantity
      selectedAttributes{
        attributeId
        title
        option{
          optionId
          title
          price
        }
      }
      createdAt
    }
    user{
      _id
      name
      phone
      email
    }
    statusQueue{
      pending
      preparing
      picked
      delivered
      cancelled
    }
    }
    origin
  }
}`

export const createCategory = `
mutation CreateCategory($title:String!){
  createCategory(category:{title:$title}){_id}
}`

export const editCategory = `
      mutation EditCategory( $_id:String,$title:String!){
        editCategory(category:{_id:$_id,title:$title}){_id}
      }`

export const deleteCategory = `
      mutation DeleteCategory($id:String!){
        deleteCategory(id:$id){
          _id
        }
      }`
export const subCategories = `query subCategories
      {
        subCategories{
            _id
            title
            image
            category{
              _id
              title
            }
      }}`
export const createSubCategory = `
      mutation CreateSubCategory($title:String!,$image:String!,$category:String!){
        createSubCategory(subCategory:{title:$title,image:$image,category:$category}){_id}
      }`

export const editSubCategory = `
            mutation EditSubCategory( $_id:String,$title:String!,$image:String!,$category:String!){
              editSubCategory(subCategory:{_id:$_id,title:$title,image:$image,category:$category}){_id}
            }`

export const deleteSubCategory = `
            mutation DeleteSubCategory($id:String!){
              deleteSubCategory(id:$id){
                _id
              }
            }`

export const attributes = `
            query OptionGroups{
              optionGroups{
                _id
                title
                subCategory{
                  _id
                  title
                }
                options{
                  _id
                  title
                }
              }
            }
`

export const getAttributesByCategory = `query GetOptionGroupsByCategory($subCategory:String!){
  getOptionGroupsByCategory(subCategory:$subCategory){
    _id
    title
    subCategory{
      _id
      title
      category{
        _id
        title
      }
    }
    options{
      _id
      title
    }
  }
}`

export const createAttributes = `
            mutation CreateOptionGroup($optionGroupInput:OptionGroupInput!){
              createOptionGroup(optionGroupInput:$optionGroupInput){
                  _id
                  title
                  subCategory{
                    _id
                    title
                  }
                  options{
                    _id
                    title
                  }
              }
            }
`

export const editAttributes = `
            mutation EditOptionGroup($optionGroupInput:OptionGroupInput!){
              editOptionGroup(optionGroupInput:$optionGroupInput){
                  _id
                  title
                  subCategory{
                    _id
                    title
                  }
                  options{
                    _id
                    title
                  }
              }
            }
`

export const deleteAttribute = `mutation DeleteOptionAttribute($id:String!){
  deleteOptionGroup(id:$id)
  }`

export const getProducts = `query Products{
  products{
    _id
    title
    skuCode
    description
    subCategory{
      _id
      title
      category{
        _id
        title
      }
    }
    image
    attributes{
      _id
      attributeId
      title
      options{
        _id
        optionId
        title
        price
        stock
      }
    }
    price
    featured
  }
}`

export const createProduct = `mutation CreateProduct($productInput:ProductInput!){
    createProduct(productInput:$productInput){
      _id
    title
    skuCode
    description
    subCategory{
      _id
      title
      category{
        _id
        title
      }
    }
    image
    attributes{
      _id
      attributeId
      title
      options{
        _id
        optionId
        title
        price
        stock
      }
    }
    price
    featured
    }
}`

export const editProduct = `mutation EditProduct($productInput:ProductInput!){
  editProduct(productInput:$productInput){
    _id
  title
  skuCode
  description
  subCategory{
    _id
    title
    category{
      _id
      title
    }
  }
  image
  attributes{
    _id
    attributeId
    title
    options{
      _id
      optionId
      title
      price
      stock
    }
  }
  price
  featured
  }
}`

export const deleteProduct = `mutation DeleteProduct($id:String!){
  deleteProduct(id:$id){
  _id
  }
}`

export const getOrders = `query Orders($page:Int,$rows:Int,$search:String){
  allOrders(page:$page,rows:$rows,search:$search){
    _id
    orderId
    paymentMethod
    paymentStatus
    status
    orderStatus
    orderAmount
    reason
    deliveryCharges
    createdAt
    deliveryAddress{
      label
      region
      city
      apartment
      building
      details
    }
    items{
      _id
      productId
      product
      price
      quantity
      selectedAttributes{
        attributeId
        title
        option{
          optionId
          title
          price
        }
      }
      createdAt
    }
    user{
      _id
      name
      phone
      email
    }
    statusQueue{
      pending
      preparing
      picked
      delivered
      cancelled
    }
  }
}`

export const getDashboardTotal = `query GetDashboardTotal($startingDate: String, $endingDate: String){
  getDashboardTotal(starting_date: $startingDate, ending_date: $endingDate){
    total_orders
    total_users
    total_sales
    total_ratings
    avg_ratings
  }
}`
export const getDashboardSales = `query GetDashboardSales($startingDate: String, $endingDate: String){
  getDashboardSales(starting_date: $startingDate, ending_date: $endingDate){
    orders{
      day
      amount
    }
  }
}`
export const getDashboardOrders = `query GetDashboardOrders($startingDate: String, $endingDate: String){
  getDashboardOrders(starting_date: $startingDate, ending_date: $endingDate){
    orders{
      day
      count
    }
  }
}`

export const getConfiguration = `query GetConfiguration{
  configuration{
    _id
    orderPrefix
    email
    password
    enableEmail
    clientId
    clientSecret
    sandbox
    publishableKey
    secretKey
    deliveryCharges
    currency
    currencySymbol
  }
}`

export const saveOrderConfiguration = `mutation SaveOrderConfiguration($configurationInput:OrderConfigurationInput!){
  saveOrderConfiguration(configurationInput:$configurationInput){
    _id
    orderPrefix
  }
}`
export const saveEmailConfiguration = `mutation SaveEmailConfiguration($configurationInput:EmailConfigurationInput!){
  saveEmailConfiguration(configurationInput:$configurationInput){
    _id
    email
    password
    enableEmail
  }
}`

export const saveDeliveryConfiguration = `mutation SaveDeliveryConfiguration($configurationInput:DeliveryConfigurationInput!){
  saveDeliveryConfiguration(configurationInput:$configurationInput){
    _id
    deliveryCharges
  }
}`
export const saveCurrencyConfiguration = `mutation SaveCurrencyConfiguration($configurationInput:CurrencyConfigurationInput!){
  saveCurrencyConfiguration(configurationInput:$configurationInput){
    _id
    currency
    currencySymbol
  }
}`

export const adminLogin = `mutation AdminLogin($email:String!,$password:String!){
  adminLogin(email:$email,password:$password){
    userId
    token
    name
    email
  }
}`

export const updateOrderStatus = `mutation UpdateOrderStatus($id:String!,$status:String!,$reason:String){
  updateOrderStatus(id:$id,status:$status,reason:$reason){
    _id
    orderStatus
    paymentStatus
  }
}`

export const updateStatus = `mutation UpdateStatus($id:String!,$status:Boolean!,$reason:String){
  updateStatus(id:$id,status:$status,reason:$reason){
    _id
    status
    reason
  }
}
`

export const uploadToken = `mutation UploadToken($pushToken:String!){
  uploadToken(pushToken:$pushToken){
    _id
    pushToken
  }
}`

export const getUsers = `query Users($page:Int){
  users(page:$page){
    _id
    name
    email
    phone
    addresses{
      _id
      label
      region
      city
      apartment
      building
      details
    }
  }
}`

export const reviews = `query AllReviews($offset:Int){
  allReviews(offset:$offset){
    _id
    rating
    description
    createdAt
    product{
      title
    }
    order{
      orderId
      user{
        name
        email
      }
   }
  }
}`

export const resetPassword = `mutation ResetPassword($password:String!,$token:String!){
  resetPassword(password:$password,token:$token){
    result
  }
}`

export const orderCount = `
query{
  orderCount
}`

export const getOrderStatuses = `query{
  getOrderStatuses
}
`

export const getPaymentStatuses = `query{
  getPaymentStatuses
}`

export const updatePaymentStatus = `mutation UpdatePaymentStatus($id:String!,$status:String!){
  updatePaymentStatus(id:$id,status:$status){
    _id
    paymentStatus
    paidAmount
  }
}`

export const createCoupon = `mutation CreateCoupon($couponInput:CouponInput!){
  createCoupon(couponInput:$couponInput){
    _id
    code
    discount
    enabled
  }
}`
export const editCoupon = `mutation editCoupon($couponInput:CouponInput!){
  editCoupon(couponInput:$couponInput){
    _id
    code
    discount
    enabled
        }
      }`
export const deleteCoupon = `mutation DeleteCoupon($id:String!){
        deleteCoupon(id:$id)
      }`

export const getCoupons = `query Coupons{
        coupons {
          _id
          code
          discount
          enabled
        }
      }`
