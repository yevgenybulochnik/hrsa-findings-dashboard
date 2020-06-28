import React from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import { SummaryChart } from '../components/summaryChart'


interface Props {

}

const Overview: React.SFC<Props> = (props) => {
  return (
    <>
      <Card elevation={Elevation.TWO}>
        <SummaryChart />
      </Card>
    </>
  )
}

export default Overview
