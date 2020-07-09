import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { SummaryChart, SummaryPie, FilterCard } from '../components/summaryChart'
import { RootState } from '../rootReducer'

const Container = styled.div`
  > * {
    margin-bottom: 1em;
  }
`

interface Props {
  pieData1: any;
  pieData2: any;
}

const Overview: React.SFC<Props> = (props) => {
  const {
    pieData1,
    pieData2,
  } = props

  return (
    <Container>
      <FilterCard />
      <SummaryChart />
      <SummaryPie data={pieData1} />
      <SummaryPie data={pieData2} />
    </Container>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    pieData1: state.summaryChart.summaryFindingsData.summary,
    pieData2: state.summaryChart.summaryFindingsData.totals
  }
}

export default connect(mapStateToProps, {})(Overview)
