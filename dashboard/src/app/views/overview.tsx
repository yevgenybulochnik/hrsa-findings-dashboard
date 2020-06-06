import React from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import BarChart from '../components/chart/barChart'


interface Props {

}

const Overview: React.SFC<Props> = (props) => {
  return (
    <>
      <Card elevation={Elevation.TWO}>
        <BarChart height='200px' data={[]}/>
      </Card>
    </>
  )
}

export default Overview
