/*eslint-disable*/
import React from 'react'
import { withTranslation } from 'react-i18next'
import { server_url } from '../../config/config'
// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap'

function Footer(props) {
  const { t } = props
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {t('2019-20')}{' '}
            <a
              className="font-weight-bold ml-1"
              href={server_url}
              rel="noopener noreferrer"
              target="_blank">
              Ecommero
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href={server_url}
                rel="noopener noreferrer"
                target="_blank">
                Ecommero
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://ninjascode.com/pages/ourteam.html"
                rel="noopener noreferrer"
                target="_blank">
                {t('About Us')}
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://medium.com/@sharangohar"
                rel="noopener noreferrer"
                target="_blank">
                {t('Blog')}
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  )
}

export default withTranslation()(Footer)
