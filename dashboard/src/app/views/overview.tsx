import React from 'react'
import { SummaryChart, FilterCard } from '../components/summaryChart'


interface Props {

}

const Overview: React.SFC<Props> = (props) => {
  return (
    <>
      <FilterCard />
      <SummaryChart />
    </>
  )
}

export default Overview
