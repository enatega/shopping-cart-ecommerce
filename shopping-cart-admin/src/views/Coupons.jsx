/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import CouponComponent from '../components/Coupon/Coupon'
// reactstrap components
import { Card, Container, Row, Modal } from 'reactstrap'

// core components
import Header from 'components/Headers/Header.jsx'
import CustomLoader from '../components/Loader/CustomLoader'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import { getCoupons, deleteCoupon, editCoupon } from '../apollo/server'
import { gql, useMutation, useQuery } from '@apollo/client'
import ActionButton from '../components/ActionButton/ActionButton'

const GET_COUPONS = gql`
  ${getCoupons}
`
const EDIT_COUPON = gql`
  ${editCoupon}
`
const DELETE_COUPON = gql`
  ${deleteCoupon}
`

const Coupon = props => {
  const [editModal, setEditModal] = useState(false)
  const [coupon, setCoupon] = useState(null)
  const [editCoupon] = useMutation(EDIT_COUPON)
  const { data, loading, error } = useQuery(GET_COUPONS)

  const toggleModal = coupon => {
    setEditModal(!editModal)
    setCoupon(coupon)
  }

  const customSort = (rows, field, direction) => {
    const handleField = row => {
      if (row[field] && isNaN(row[field])) {
        return row[field].toLowerCase()
      }

      return row[field]
    }

    return orderBy(rows, handleField, direction)
  }

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection)

  const columns = [
    {
      name: 'Code',
      sortable: true,
      selector: 'code'
    },
    {
      name: 'Discount %',
      sortable: true,
      selector: 'discount'
    },
    {
      name: 'Status',
      cell: row => <>{statusChanged(row)}</>
    },
    {
      name: 'Action',
      cell: row => (
        <ActionButton
          deleteButton={true}
          editButton={true}
          row={row}
          mutation={DELETE_COUPON}
          editModal={toggleModal}
          refetchQuery={GET_COUPONS}
        />
      )
    }
  ]

  const statusChanged = row => {
    return (
      <label className="custom-toggle">
        <input
          onClick={() => {
            editCoupon({
              variables: {
                couponInput: {
                  _id: row._id,
                  code: row.code,
                  discount: row.discount,
                  enabled: !row.enabled
                }
              }
            })
          }}
          defaultChecked={row.enabled}
          type="checkbox"
        />
        <span className="custom-toggle-slider rounded-circle" />
      </label>
    )
  }

  const { t } = props
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <CouponComponent />
        {/* Table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="shadow">
              {error ? (
                <span>
                  {t('Error')}!{error.message}
                </span>
              ) : (
                <DataTable
                  title={t('Coupons')}
                  columns={columns}
                  data={data ? data.coupons : []}
                  pagination
                  progressPending={loading}
                  progressComponent={<CustomLoader />}
                  onSort={handleSort}
                  sortFunction={customSort}
                  defaultSortField="code"
                />
              )}
            </Card>
          </div>
        </Row>
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={editModal}
          toggle={() => {
            toggleModal(null)
          }}>
          <CouponComponent coupon={coupon} />
        </Modal>
      </Container>
    </>
  )
}

export default withTranslation()(Coupon)
