/* eslint-disable camelcase */
import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  Observable,
  split,
  concat,
  gql
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import * as firebase from 'firebase/app'
import 'firebase/messaging'
import 'assets/vendor/nucleo/css/nucleo.css'
import 'assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/scss/argon-dashboard-react.scss'
import { getOrders, uploadToken } from '../src/apollo/server'

import { ws_server_url, server_url } from './config/config'
import App from './app'
import { getMainDefinition } from '@apollo/client/utilities'
const GET_ORDERS = gql`
  ${getOrders}
`
const UPLOAD_TOKEN = gql`
  ${uploadToken}
`

const firebaseConfig = {
  apiKey: 'AIzaSyDKvrBL1aKKBTOYA6uI-DOEcmfyxGmMaUA',
  authDomain: 'ecommero-1f0eb.firebaseapp.com',
  databaseURL: 'https://ecommero-1f0eb.firebaseio.com',
  projectId: 'ecommero-1f0eb',
  storageBucket: 'ecommero-1f0eb.appspot.com',
  messagingSenderId: '378663620953',
  appId: '1:378663620953:web:f7fdee12ac941bf7acfc48',
  measurementId: 'G-880ZF4HYKW'
}

const cache = new InMemoryCache()
const httpLink = createHttpLink({
  uri: `${server_url}graphql`
})
const wsLink = new WebSocketLink({
  uri: `${ws_server_url}graphql`,
  options: {
    reconnect: true
  }
})

const request = async operation => {
  const data = localStorage.getItem('user-ecommero')
  let token = null
  if (data) {
    token = JSON.parse(data).token
  }
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      console.log(observer)
      let handle
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink
  // httpLink,
)

const client = new ApolloClient({
  link: concat(ApolloLink.from([terminatingLink, requestLink]), httpLink),
  cache
})

// // Initialize Firebase
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.usePublicVapidKey(
  'BLCxCxZNWKMEdILDgysfBPq6BOMk4srGOe1kyug1RHfmKOJbMXIhqzqFhvhROZ9nDbiLKH9EKEKDf75wX9sCeEc'
)
messaging
  .requestPermission()
  .then(function() {
    messaging
      .getToken()
      .then(function(currentToken) {
        if (currentToken) {
          client
            .mutate({
              mutation: UPLOAD_TOKEN,
              variables: { pushToken: currentToken }
            })
            .then(() => {})
            .catch(() => {})
        } else {
        }
      })
      .catch(function() {})
  })
  .catch(function() {})

messaging.onMessage(function(payload) {
  var notificationTitle = 'New Order on Ecommero'
  var notificationOptions = {
    body: payload.data.orderid,
    icon: 'https://ecommero.ninjascode.com/assets/images/logo.png'
  }
  const nt = new Notification(notificationTitle, notificationOptions)
  nt.onclick = function(event) {
    event.preventDefault() // prevent the browser from focusing the Notification's tab
    window.open('https://ecommero.ninjascode.com/dashboard')
    nt.close()
  }
  // console.log('Message received. ', payload);
  client.query({ query: GET_ORDERS, fetchPolicy: 'network-only' })
})
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
