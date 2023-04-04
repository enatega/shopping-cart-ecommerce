/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from 'expo-constants'

const ENV = {
  development: {
    GRAPHQL_URL: 'http://10.97.28.83:8002/graphql',
    WS_GRAPHQL_URL: 'ws://10.97.28.83:8002/graphql',
    SERVER_URL: 'http://10.97.28.83:8002/', // put / at the end of server url

    IOS_CLIENT_ID_GOOGLE:
      '378663620953-l6o6dgo2a7gtcn7brfkgaqf7sv81hfcr.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
      '378663620953-dtqi67u1022oq54e3rmrusr71v4kocmc.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '404956210315749',
    AMPLITUDE_API_KEY: '358ef0deb443586e2cc4ddd4380151f0',
    STRIPE_PUBLIC_KEY: 'pk_test_lEaBbVGnTkzja2FyFiNlbqtw',
    STRIPE_IMAGE_URL: 'https://ecommero.ninjascode.com/assets/images/logo.png',
    STRIPE_STORE_NAME: 'Ecommero'
  },
  staging: {
    GRAPHQL_URL: 'https://ecommero.ninjascode.com/graphql',
    WS_GRAPHQL_URL: 'wss://ecommero.ninjascode.com/graphql',
    SERVER_URL: 'https://ecommero.ninjascode.com/', // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
      '378663620953-l6o6dgo2a7gtcn7brfkgaqf7sv81hfcr.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
      '378663620953-dtqi67u1022oq54e3rmrusr71v4kocmc.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '404956210315749',
    AMPLITUDE_API_KEY: '358ef0deb443586e2cc4ddd4380151f0',
    STRIPE_PUBLIC_KEY: 'pk_test_lEaBbVGnTkzja2FyFiNlbqtw',
    STRIPE_IMAGE_URL: 'https://ecommero.ninjascode.com/assets/images/logo.png',
    STRIPE_STORE_NAME: 'Ecommero'
  },
  production: {
    GRAPHQL_URL: 'https://ecommero.ninjascode.com/graphql',
    WS_GRAPHQL_URL: 'wss://ecommero.ninjascode.com/graphql',
    SERVER_URL: 'https://ecommero.ninjascode.com/', // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
      '378663620953-btsp8b3g44tkclkqogobmp2r8t13v9vf.apps.googleusercontent.com',
    ANDROID_CLIENT_ID_GOOGLE:
      '378663620953-ocloim6fpl97fmu3tmcairgh5ju5flhl.apps.googleusercontent.com',
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
