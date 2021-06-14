import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Container, Row, Card, Modal } from 'reactstrap'
import OrderComponent from '../components/Order/Order'
import OrdersData from '../components/Order/OrderData'
import Header from 'components/Headers/Header.jsx'
import { getOrders } from '../apollo/server'
import { useQuery, gql } from '@apollo/client'

const GET_ORDERS = gql`
  ${getOrders}
`
const Orders = props => {
  const [detailsModal, setDetailModal] = useState(false)
  const [order, setOrder] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { data, loading, error, subscribeToMore } = useQuery(GET_ORDERS, {
    variables: {
      page: page - 1,
      rows: rowsPerPage,
      search
    }
  })

  const toggleModal = order => {
    setOrder(order)
    setDetailModal(!detailsModal)
  }

  const { t } = props
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              {error ? (
                <tr>
                  <td>
                    {t('Error')}! ${error.message}
                  </td>
                </tr>
              ) : (
                <OrdersData
                  orders={data ? data.allOrders : []}
                  toggleModal={toggleModal}
                  subscribeToMore={subscribeToMore}
                  loading={loading}
                  selected={order}
                  updateSelected={setOrder}
                  search={setSearch}
                  page={setPage}
                  rows={setRowsPerPage}
                />
              )}
            </Card>
          </div>
        </Row>
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={detailsModal}
          toggle={() => {
            toggleModal(null)
          }}>
          <OrderComponent order={order} />
        </Modal>
      </Container>
    </>
  )
}

export default withTranslation()(Orders)
