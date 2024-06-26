import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader} from 'vtex.styleguide'

import CookiesTable from './CookiesTable/index'

import './styles.global.css'

const ChineseCookiesAdmin: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="chinese-cookies.title" />}
        />
      }
    >
      <PageBlock variation="full">
        <CookiesTable />
      </PageBlock>
    </Layout>
  )
}

export default ChineseCookiesAdmin
