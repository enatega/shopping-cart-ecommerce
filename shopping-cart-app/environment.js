/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from 'expo-constants'

const ENV = {
  development: {
    GRAPHQL_URL: 'https://shopping-cart-api.up.railway.app/graphql',
    WS_GRAPHQL_URL: 'wss://shopping-cart-api.up.railway.app/graphql',
    SERVER_URL: 'https://shopping-cart-api.up.railway.app/',
    // GRAPHQL_URL: 'http://10.97.28.50:8002/graphql',
    // WS_GRAPHQL_URL: 'ws://10.97.28.50:8002/graphql',
    // SERVER_URL: 'http://10.97.28.50:8002/', // put / at the end of server url
    Expo_CLIENT_ID_GOOGLE:
      '1041802076420-pi7qln0r9tqb2nj8gju3286qti3alkj4.apps.googleusercontent.com',
    IOS_CLIENT_ID_GOOGLE:
      '1041802076420-3aomh29ianv3jto94ve7pa8748kg5mkb.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
      '1041802076420-ebfavrc88drh2ooealh4i5qv6efjivab.apps.googleusercontent.com',

    FACEBOOK_APP_ID: '404956210315749',
    AMPLITUDE_API_KEY: '358ef0deb443586e2cc4ddd4380151f0',
    STRIPE_PUBLIC_KEY: 'pk_test_lEaBbVGnTkzja2FyFiNlbqtw',
    STRIPE_IMAGE_URL: 'https://ecommero.ninjascode.com/assets/images/logo.png',
    STRIPE_STORE_NAME: 'Ecommero'
  },
  staging: {
    GRAPHQL_URL: 'https://shopping-cart-api.up.railway.app/graphql',
    WS_GRAPHQL_URL: 'wss://shopping-cart-api.up.railway.app/graphql',
    SERVER_URL: 'https://shopping-cart-api.up.railway.app/', // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
      '1041802076420-3aomh29ianv3jto94ve7pa8748kg5mkb.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
      '1041802076420-ebfavrc88drh2ooealh4i5qv6efjivab.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '404956210315749',
    AMPLITUDE_API_KEY: '358ef0deb443586e2cc4ddd4380151f0',
    STRIPE_PUBLIC_KEY: 'pk_test_lEaBbVGnTkzja2FyFiNlbqtw',
    STRIPE_IMAGE_URL: 'https://ecommero.ninjascode.com/assets/images/logo.png',
    STRIPE_STORE_NAME: 'Ecommero'
  },
  production: {
    GRAPHQL_URL: 'https://shopping-cart-api.up.railway.app/graphql',
    WS_GRAPHQL_URL: 'wss://shopping-cart-api.up.railway.app/graphql',
    SERVER_URL: 'https://shopping-cart-api.up.railway.app/', // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
      '1041802076420-3aomh29ianv3jto94ve7pa8748kg5mkb.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
      '1041802076420-ebfavrc88drh2ooealh4i5qv6efjivab.apps.googleusercontent.com',
    AMPLITUDE_API_KEY: '358ef0deb443586e2cc4ddd4380151f0',
    STRIPE_PUBLIC_KEY: 'pk_test_lEaBbVGnTkzja2FyFiNlbqtw',
    STRIPE_IMAGE_URL: 'https://ecommero.ninjascode.com/assets/images/logo.png',
    STRIPE_STORE_NAME: 'Ecommero'
  }
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.development
  } else if (env === 'production') {
    return ENV.production
  } else if (env === 'staging') {
    return ENV.staging
  } else {
    return ENV.staging
  }
}

export default getEnvVars
