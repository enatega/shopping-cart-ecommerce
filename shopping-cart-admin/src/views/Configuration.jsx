import React from 'react'
import { withTranslation } from 'react-i18next'
import { Container } from 'reactstrap'
import Header from 'components/Headers/Header.jsx'
import { getConfiguration } from '../apollo/server'
import OrderConfiguration from '../components/Configuration/Order/Order'
import EmailConfiguration from '../components/Configuration/Email/Email'
import PaypalConfiguration from '../components/Configuration/Paypal/Paypal'
import StripeConfiguration from '../components/Configuration/Stripe/Stripe'
import DeliveryConfiguration from '../components/Configuration/Delivery/Delivery'
import CurrencyConfiguration from '../components/Configuration/Currency/Currency'
import Loader from 'react-loader-spinner'
import { gql, useQuery } from '@apollo/client'

const GET_CONFIGURATION = gql`
  ${getConfiguration}
`

const Configuration = props => {
  const { data, loading, error } = useQuery(GET_CONFIGURATION)
  if (data) console.log(data.configuration)
  return (
    <>
      <Header />
      {error ? (
        'Error :('
      ) : loading ? (
        <Container className="text-center mt-10" fluid>
          <Loader
            type="TailSpin"
            color="#fb6340"
            height={300}
            width={300}
            visible={loading}
          />
        </Container>
      ) : (
        <Container className="mt--7" fluid>
          <Loader
            type="TailSpin"
            color="#FFF"
            height={25}
            width={30}
            visible={loading}
          />
          <OrderConfiguration prefix={data.configuration.orderPrefix} />
          <EmailConfiguration
            email={data.configuration.email}
            password={data.configuration.password}
            enabled={data.configuration.enableEmail}
          />
          <PaypalConfiguration
            clientId={data.configuration.clientId}
            clientSecret={data.configuration.clientSecret}
            sandbox={data.configuration.sandbox}
          />
          <StripeConfiguration
            publishableKey={data.configuration.publishableKey}
            secretKey={data.configuration.secretKey}
          />
          <DeliveryConfiguration
            deliveryCharges={data.configuration.deliveryCharges}
          />
          <CurrencyConfiguration
            currencyCode={data.configuration.currency}
            currencySymbol={data.configuration.currencySymbol}
          />
        </Container>
      )}
    </>
  )
}

export default withTranslation()(Configuration)
